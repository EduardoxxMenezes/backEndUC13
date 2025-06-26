// pegar elementos do DOM
const container = document.getElementById("petCardsContainer"); 
const editPanel = document.getElementById("editPetPanel");
const editForm = document.getElementById("editPetForm");
const cancelEditBtn = document.getElementById("cancelEditBtn");

const searchInput = document.getElementById("searchInput");
const btnSearch = document.getElementById("btnSearch");

let allPets = []; // guarda todos os pets carregados

// função para carregar e renderizar pets
async function carregarPets() {
  container.innerHTML = ""; // limpa container

  try {
    const res = await fetch("http://localhost:3000/api/pets"); //conecta com o router do pet
    if (!res.ok) throw new Error("Erro ao carregar os pets"); // se nao conectar: ERRO.

    allPets = await res.json(); 

    renderPets(allPets); // Renderiza os pets
  } catch (error) { //caso ocorra algum erro vai alertar.
    console.error("Erro ao carregar pets:", error);
    container.innerHTML = `<p style="color: red;">Erro ao carregar os pets.</p>`;
  }
}

// função para renderizar lista de pets
function renderPets(pets) {
  container.innerHTML = "";

  pets.forEach(pet => { //cria uma DIV para cada pet no banco de dados.
    const card = document.createElement("div");
    card.classList.add("pet-card");

    card.innerHTML = ` 
      <img src="${pet.picture}" alt="${pet.name}" class="pet-img">
      <h3>${pet.name}</h3>
      <p>Gênero: ${pet.genre}</p>
      <p>Espécie: ${pet.specie}</p>
      ${!pet.isAdoptable ? `<p class="adopted">ADOTADO</p>` : ''}
      <div class="card-actions">
        <span class="icon edit-icon" title="Editar">✏️</span>
        <button class="adotar-btn" ${!pet.isAdoptable ? "disabled" : ""}>ADOTAR</button> 
        <span class="icon delete-icon" title="Excluir">🗑️</span>
      </div>
    `;

    container.appendChild(card); //coloca o DIV do animal no container

    // Eventos
    const editIcon = card.querySelector(".edit-icon");
    editIcon.addEventListener("click", () => openEditPanel(pet));

    const adotarBtn = card.querySelector(".adotar-btn");
    adotarBtn.addEventListener("click", async () => { //faz com que quando aperte o botão "adotar" apareca um texto em verde.
      try {
        const res = await fetch(`http://localhost:3000/api/pets/${pet.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isAdoptable: false }),
        });

        if (!res.ok) throw new Error("Erro ao atualizar pet");

        alert("Pet adotado com sucesso!");
        carregarPets();
      } catch (error) {
        alert("Erro ao adotar pet: " + error.message);
        console.error(error);
      }
    });

    const deleteIcon = card.querySelector(".delete-icon"); //quando clicar no icone de deletar, ele vai deletar o pet.
    deleteIcon.addEventListener("click", () => deletarPet(pet.id, card));
  });
}

// abrir painel de edição com dados preenchidos
function openEditPanel(pet) {
  editPanel.style.display = "block";

  document.getElementById("editPetId").value = pet.id;
  document.getElementById("editName").value = pet.name;
  document.getElementById("editSpecie").value = pet.specie;
  document.getElementById("editGenre").value = pet.genre;
  document.getElementById("editAge").value = pet.age;
  document.getElementById("editIsAdoptable").checked = pet.isAdoptable;
  document.getElementById("editPicture").value = pet.picture;
}

// evento submit para atualizar pet
editForm.addEventListener("submit", async (e) => { //evento para editar o pet.
  e.preventDefault();


  //pega os elementos de edição no DOM
  const id = document.getElementById("editPetId").value;
  const updatedPet = {
    name: document.getElementById("editName").value,
    specie: document.getElementById("editSpecie").value,
    genre: document.getElementById("editGenre").value,
    age: parseInt(document.getElementById("editAge").value),
    isAdoptable: document.getElementById("editIsAdoptable").checked,
    picture: document.getElementById("editPicture").value,
  };

  try {//Conecta com o rout do pet na funçao de editar e envia as informações necessarias.
    const res = await fetch(`http://localhost:3000/api/pets/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPet),
    });

    if (!res.ok) throw new Error("Erro ao atualizar pet"); 

    alert("Pet atualizado com sucesso!");
    editPanel.style.display = "none";

    carregarPets();
  } catch (error) {
    alert(error.message);
  }
});

// cancelar edição
cancelEditBtn.addEventListener("click", () => {
  editPanel.style.display = "none";
});

// deletar pet
async function deletarPet(id, cardElement) {
  const confirmar = confirm("Tem certeza que deseja deletar este pet?");
  if (!confirmar) return;

  try {
    const res = await fetch(`http://localhost:3000/api/pets/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Erro ao deletar pet");

    cardElement.remove();
    alert("Pet deletado com sucesso!");
  } catch (error) {
    alert("Erro ao deletar pet: " + error.message);
    console.error(error);
  }
}

// evento no botão buscar
btnSearch.addEventListener("click", () => {
  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    renderPets(allPets);
    return;
  }

  const filtered = allPets.filter(pet => {
    return (
      pet.name.toLowerCase().includes(query) ||
      pet.specie.toLowerCase().includes(query) ||
      pet.genre.toLowerCase().includes(query) ||
      pet.id.toString() === query
    );
  });

  renderPets(filtered);
});

// buscar ao apertar Enter
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    btnSearch.click();
  }
});

// inicia tudo
window.addEventListener("DOMContentLoaded", carregarPets);

const submit = document.getElementById("registerAnimal1");
const form = document.getElementById("formAnimal");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.querySelector("#nameAnimal").value
    const specie = document.querySelector("#specieAnimal").value;
    const age = document.querySelector("#ageAnimal").value;
    const genre = document.querySelector("#genreAnimal").value
    const picture = document.querySelector("#pictureAnimal").value;

    try {
        
        const res = await fetch("http://localhost:3000/api/pets",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, specie, age: Number(age), genre, picture })
        });

       if (res.ok) {
    alert(`${name} Cadastrado com sucesso!`);
      window.location.href = "./buscarAnimais.html"; // <- Caminho correto!
    }else {
            const data = await res.json();
            alert(data.message || "Erro ao cadastrar");
        }
    } catch (error) {
        alert("Erro na requisição: " + error.message);
    }});



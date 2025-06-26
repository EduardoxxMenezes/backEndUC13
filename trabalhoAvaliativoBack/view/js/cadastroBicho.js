const submit = document.getElementById("registerAnimal1");
const form = document.getElementById("formAnimal");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
 //pega as informações do DOM para criar o animal.
    const name = document.querySelector("#nameAnimal").value
    const specie = document.querySelector("#specieAnimal").value;
    const age = document.querySelector("#ageAnimal").value;
    const genre = document.querySelector("#genreAnimal").value
    const picture = document.querySelector("#pictureAnimal").value;

    try { // conecta com o rout de pets e envia as informações.
        
        const res = await fetch("http://localhost:3000/api/pets",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, specie, age: Number(age), genre, picture })
        });

       if (res.ok) { 
    alert(`${name} Cadastrado com sucesso!`);
      window.location.href = "./buscarAnimais.html"; //leva a pagina principal
    }else { //caso ocorra algum erro durante o cadastro
            const data = await res.json();
            alert(data.message || "Erro ao cadastrar");
        }
    } catch (error) {
        alert("Erro na requisição: " + error.message);
    }});



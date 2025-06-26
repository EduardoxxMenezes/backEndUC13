const form = document.querySelector("#loginInfo");


//assim que o formulario for enviado ele irá ativar a função
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    //pega os elementos do DOM
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#senha").value;

    //Se tiver um email e uma senha ele irá ativar a função, caso contrário irá alertar.
    if(email === "" || password === ""){
        alert("INSIRA UM EMAIL E UMA SENHA!");
        return;
    }

    try { //tenta conectar com o rout do usuario na função login
        const res = await fetch("http://localhost:3000/api/usuarios/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password }) //envia para o back o email e a senha
        });

        if (res.ok) { //se a função funcionar, vai redirecionar para a tela principal
            alert("LOGIN REALIZADO COM SUCESSO!");
            window.location.href = "./view/buscarAnimais.html";
        } else { //se a função falhar irá alertar erro.
            const data = await res.json();
            alert(data.message || "Erro ao fazer login");
        }
    } catch (error) {
        alert("Erro na requisição: " + error.message);
    }
});

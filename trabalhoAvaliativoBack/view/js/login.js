const form = document.querySelector("#loginInfo");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#senha").value;

    if(email === "" || password === ""){
        alert("INSIRA UM EMAIL E UMA SENHA!");
        return;
    }

    try {
        const res = await fetch("http://localhost:3000/api/usuarios/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (res.ok) {
            alert("LOGIN REALIZADO COM SUCESSO!");
            window.location.href = "./view/buscarAnimais.html";
        } else {
            const data = await res.json();
            alert(data.message || "Erro ao fazer login");
        }
    } catch (error) {
        alert("Erro na requisição: " + error.message);
    }
});

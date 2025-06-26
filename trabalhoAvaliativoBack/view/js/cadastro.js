const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // pega os dados do form
  const name = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("senha").value;
  const confirmPassword = document.getElementById("confrmSenha").value;
console.log(name, email, password)
  if (password !== confirmPassword) {
    alert("As senhas não conferem");
    return;
  }

  try { //conecta com o rout de usuarios e ativa a função de cadastrar.
    const res = await fetch("http://localhost:3000/api/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, userType: "user" }), // Eu ia fazer um negocio onde só administradores podem  criar e deletar os pets mas nao deu tempo
    });

    if (res.ok) {
      alert("Cadastro realizado com sucesso!");
      window.location.href = "../index.html"; // leva para pagina de login
    } else {
      const data = await res.json();
      alert(data.message || "Erro ao cadastrar");
    }
  }catch (error) { //caso encontre algum erro.
    console.error("Erro ao registrar usuário:", error);
    alert("Erro ao registrar usuário.");
  }
});

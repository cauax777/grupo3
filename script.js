const form = document.getElementById("formVerificacao");
const email = document.getElementById("email");
const telefone = document.getElementById("telefone");
const emailErro = document.getElementById("emailErro");
const telefoneErro = document.getElementById("telefoneErro");
const mensagemSucesso = document.getElementById("mensagemSucesso");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // impede envio automático

  let valido = true;

  // Validação de e-mail
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailValido.test(email.value)) {
    emailErro.style.display = "block";
    valido = false;
  } else {
    emailErro.style.display = "none";
  }

  // Validação de telefone (apenas números)
  const telefoneValido = /^[0-9]{8,15}$/;
  if (!telefoneValido.test(telefone.value)) {
    telefoneErro.style.display = "block";
    valido = false;
  } else {
    telefoneErro.style.display = "none";
  }

  // Se tudo ok
  if (valido) {
    mensagemSucesso.textContent = "✅ Formulário enviado com sucesso!";
    mensagemSucesso.style.display = "block";
    form.reset();
  } else {
    mensagemSucesso.style.display = "none";
  }
});

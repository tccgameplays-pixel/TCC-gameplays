document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reportForm");
  const confirmationOverlay = document.getElementById("confirmationOverlay");
  const confirmationMessage = document.getElementById("confirmationMessage");
  const okButton = document.getElementById("okButton");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const category = document.getElementById("category").value;
    const location = document.getElementById("location").value;
    const details = document.getElementById("details").value;

    if (!category || !details.trim()) {
      confirmationMessage.textContent = "⚠️ Preencha os campos obrigatórios!";
      confirmationOverlay.style.display = "flex";
      return;
    }

    // Envio via EmailJS
    emailjs.send("service_jmd", "template_jmd", {
      to_email: "tccgameplays@gmail.com",
      category: category,
      location: location,
      details: details
    }).then(() => {
      confirmationMessage.textContent = "✅ Sua denúncia foi enviada com sucesso!";
      confirmationOverlay.style.display = "flex";
      form.reset();
    }).catch((error) => {
      confirmationMessage.textContent = "❌ Erro ao enviar: " + JSON.stringify(error);
      confirmationOverlay.style.display = "flex";
    });
  });

  okButton.addEventListener("click", () => {
    confirmationOverlay.style.display = "none";
  });
});

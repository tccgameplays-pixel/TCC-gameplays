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

    confirmationMessage.textContent = "✅ Sua denúncia foi feita";
    confirmationOverlay.style.display = "flex";
    form.reset();
  });

  okButton.addEventListener("click", () => {
    location.reload();
  });
});

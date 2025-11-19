document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reportForm");
  const reportList = document.getElementById("reportList");
  const confirmationBox = document.getElementById("confirmationBox");
  const confirmationMessage = document.getElementById("confirmationMessage");
  const okButton = document.getElementById("okButton");

  const reports = [];

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const category = document.getElementById("category").value;
    const location = document.getElementById("location").value;
    const details = document.getElementById("details").value;

    if (!category || !details.trim()) {
      confirmationMessage.textContent = "⚠️ Preencha os campos obrigatórios!";
      confirmationBox.style.display = "block";
      return;
    }

    const report = { category, location, details };
    reports.push(report);

    form.reset();
    renderReports();

    // Exibir mensagem de sucesso
    confirmationMessage.textContent = "✅ Sua denúncia foi feita";
    confirmationBox.style.display = "block";
  });

  okButton.addEventListener("click", () => {
    // Atualiza a página ao clicar em OK
    location.reload();
  });

  function renderReports() {
    reportList.innerHTML = "";
    reports.forEach(r => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${r.category}</strong><br>
        Local: ${r.location || "Não informado"}<br>
        ${r.details}
      `;
      reportList.appendChild(li);
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reportForm");
  const reportList = document.getElementById("reportList");
  const confirmationMessage = document.getElementById("confirmationMessage");

  // Carregar denúncias salvas
  const reports = JSON.parse(localStorage.getItem("reports")) || [];
  renderReports();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const category = document.getElementById("category").value;
    const location = document.getElementById("location").value;
    const details = document.getElementById("details").value;

    if (!category || !details.trim()) {
      confirmationMessage.textContent = "⚠️ Preencha os campos obrigatórios!";
      confirmationMessage.className = "success";
      confirmationMessage.classList.remove("hidden");
      return;
    }

    // Gerar protocolo único
    const protocol = "JM-" + Date.now();

    const report = {
      id: Date.now(),
      category,
      location,
      details,
      protocol
    };

    reports.push(report);
    localStorage.setItem("reports", JSON.stringify(reports));

    form.reset();
    renderReports();

    // Exibir mensagem na tela
    confirmationMessage.textContent = `✅ Sua denúncia foi registrada com sucesso! Protocolo: ${protocol}`;
    confirmationMessage.className = "success";
    confirmationMessage.classList.remove("hidden");
  });

  function renderReports() {
    reportList.innerHTML = "";
    reports.forEach(r => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${r.category}</strong><br>
        Local: ${r.location || "Não informado"}<br>
        ${r.details}<br>
        <em>Protocolo: ${r.protocol}</em>
      `;
      reportList.appendChild(li);
    });
  }
});

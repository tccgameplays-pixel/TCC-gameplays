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
      showMessage("⚠️ Preencha os campos obrigatórios!", "error");
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

    // Exibir mensagem de sucesso
    showMessage("✅ Sua denúncia foi feita! Protocolo: " + protocol, "success");
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

  // Função para mostrar mensagens
  function showMessage(text, type) {
    confirmationMessage.textContent = text;
    confirmationMessage.className = type; // aplica classe success ou error
    confirmationMessage.style.display = "block";

    // Esconde automaticamente após 5 segundos
    setTimeout(() => {
      confirmationMessage.style.display = "none";
    }, 5000);
  }
});

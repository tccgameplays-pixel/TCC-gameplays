document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reportForm");
  const reportList = document.getElementById("reportList");

  // Carregar denúncias salvas
  const reports = JSON.parse(localStorage.getItem("reports")) || [];
  renderReports();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const category = document.getElementById("category").value;
    const location = document.getElementById("location").value;
    const details = document.getElementById("details").value;

    if (!category || !details.trim()) {
      alert("Preencha os campos obrigatórios!");
      return;
    }

    const report = {
      id: Date.now(),
      category,
      location,
      details
    };

    reports.push(report);
    localStorage.setItem("reports", JSON.stringify(reports));

    form.reset();
    renderReports();
    alert("Denúncia registrada anonimamente!");
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


const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "reports",
  reportPath: "reports/html",
  pageTitle: "SauceDemo Automation Report",
  reportName: "Rapport des Tests Automatisés",
  displayDuration: true,
  displayReportTime: true,
  metadata: {
    browser: {
      name: "chrome",
      version: "latest",
    },
    device: "Serveur Jenkins",
    platform: {
      name: "Windows",
      version: "11",
    },
  },
  customData: {
    title: "Informations d'Exécution",
    data: [
      { label: "Projet", value: "SauceDemo Automation" },
      { label: "Version", value: "1.0.0" },
      { label: "Environnement", value: "CI/CD Jenkins" },
      { label: "Date d'exécution", value: new Date().toLocaleString('fr-FR') },
    ],
  },
});

console.log('📊 Rapport HTML généré avec succès !');
process.exit(0);
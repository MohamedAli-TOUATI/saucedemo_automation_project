const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "reports", // dossier où le fichier JSON est généré
  reportPath: "reports/html", // dossier du rapport final
  metadata: {
    browser: {
      name: "chrome",
      version: "latest",
    },
    device: "Local test machine",
    platform: {
      name: "windows",
      version: "11",
    },
  },
  customData: {
    title: "SauceDemo Automation Report",
    data: [
      { label: "Project", value: "SauceDemo Automation" },
      { label: "Release", value: "1.0.0" },
      { label: "Execution Date", value: new Date().toISOString() },
    ],
  },
});

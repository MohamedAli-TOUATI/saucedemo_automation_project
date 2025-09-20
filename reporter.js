const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "reports", // chemin du dossier contenant cucumber-report.json
  reportPath: "reports/html", // dossier où sera généré le HTML
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
});

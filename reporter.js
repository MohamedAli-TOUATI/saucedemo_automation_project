const reporter = require('cucumber-html-reporter');
const path = require('path');

const options = {
  theme: 'bootstrap',
  jsonFile: path.join(__dirname, 'reports/cucumber-report.json'),
  output: path.join(__dirname, 'reports/html/cucumber-report.html'),
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  metadata: {
    "Application": "SauceDemo",
    "Environnement": "Jenkins CI/CD",
    "Navigateur": "Chrome",
    "Plateforme": "Windows 11",
    "Version": "1.0.0",
    "Exécuté le": new Date().toLocaleString('fr-FR')
  },
  screenshotsDirectory: 'reports/screenshots/',
  storeScreenshots: true,
  noInlineScreenshots: false
};

// Créer le dossier si nécessaire
const fs = require('fs');
const reportsDir = path.join(__dirname, 'reports/html');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

reporter.generate(options);
console.log('📊 Rapport HTML professionnel généré !');
process.exit(0);
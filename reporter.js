const reporter = require('cucumber-html-reporter');
const path = require('path');
const fs = require('fs');

// Créer le dossier reports/html si nécessaire
const reportsDir = path.join(__dirname, 'reports/html');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

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
    "Navigateur": "Chrome Latest",
    "Plateforme": "Windows 11",
    "Version": "1.0.0",
    "Exécuté le": new Date().toLocaleString('fr-FR')
  },
  screenshotsDirectory: 'reports/screenshots/',
  storeScreenshots: false,
  noInlineScreenshots: false
};

try {
  reporter.generate(options);
  console.log('🎉 Rapport HTML Bootstrap généré avec succès !');
  console.log('📁 Fichier : reports/html/cucumber-report.html');
  process.exit(0);
} catch (error) {
  console.error('❌ Erreur génération rapport:', error);
  process.exit(1);
}
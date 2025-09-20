const reporter = require('multiple-cucumber-html-reporter');

reporter.generate({
  jsonDir: 'reports', // dossier où cucumber-js génère le JSON
  reportPath: 'reports/html', // dossier du rapport HTML
  metadata: {
    browser: {
      name: 'chrome',
      version: '120'
    },
    device: 'Local test machine',
    platform: {
      name: 'windows',
      version: '10'
    }
  },
  customData: {
    title: 'SauceDemo Automation Report',
    data: [
      { label: 'Project', value: 'SauceDemo Automation' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Execution Start Time', value: new Date().toLocaleString() },
    ]
  }
});

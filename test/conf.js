exports.config = {
  specs: ['acceptance/*.js'],
  framework: 'mocha',
  mochaOpts: {
    reporter: 'spec',
    slow: 3000,
    enableTimeouts: false
  },
  capabilities: {
    'browserName': 'firefox'
  },
  directConnect: true
};

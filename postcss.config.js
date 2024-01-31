// postcss.config.js
const fs = require('fs');
const configData = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));

module.exports = {
  plugins: {
    'postcss-replace': {
      pattern: /\{\{(.*?)\}\}/g,
      data: configData,
    },
  },
};

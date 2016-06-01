'use strict';

var fs = require('fs'),
  handlebars = require("node-handlebars"),
  _ = require('underscore');

var reporter = {
  name: 'html',
  report: (results) => {
    var inputData = reporter.coalateData(results);

    return new Promise((resolve, reject) => {
      reporter.generateReport(inputData).then((html) => {
        fs.writeFile('/tmp/test.html', html, (err) => {
          if(err) {
            console.error(err);
            reject(err);
          } else {
            console.log(html);
            resolve(html);
          }
        });
      });
    });
  },
  coalateData: (input) => {
    var data = {};
    _.each(input, (item) => {
      if(!item) {return;}
      if(!data[item.fullPath]) {
        data[item.fullPath] = [];
      }
      item.class = (item.severity === 'error') ? 'danger' :  item.severity;


      data[item.fullPath].push(item);
    });
    return data;
  },
  generateReport: (inputData) => {
    var  templatesDir = __dirname + '/templates',
      hbs = handlebars.create({
        partialsDir: templatesDir
      });

    return new Promise((resolve, reject) => {
      hbs.engine(templatesDir + '/report.hbs', inputData, (err, html) => {
        if(err) {
          reject(err);
        } else {
          resolve(html);
        }
      });
    });
  }
}

module.exports = reporter;

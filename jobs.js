var Agenda = require('agenda');
var Verizon = require('./models/verizon');
var request = require('request');
var jsdom = require("jsdom");

var agenda = new Agenda({ db: { address: 'mongodb://127.0.0.1/agenda', collection: 'agendaJobs' } });

agenda.define('greet the world', function(job, done) {
  console.log('Hello!');
  done();
});

agenda.define('scrape verizon', function (job, done) {
  url = 'https://www.verizonwireless.com/plans/verizon-plan/';

  jsdom.env({
    url: url,
    scripts: ["http://code.jquery.com/jquery.js"],
    done: function (err, window) {
      var $ = window.$;
      var scrapeJson = {};
      var scrape = $('.htmlscript script').eq(4).text();
      var scrapePreJson = scrape.split('= ')[1].split(';')[0];
      var scrapeJson = JSON.parse(scrapePreJson);

      var newVerizon = Verizon(scrapeJson);

      newVerizon.save(function(err) {
      if (err) throw err;
        console.log('Verizon scraped!');
      });
    }
  });

  done();
});

agenda.on('ready', function() {
    agenda.start(); 
    // agenda.every('5 seconds', 'greet the world', { time: new Date() });
    agenda.every('1 days', 'scrape verizon', { time: new Date() });
});

module.exports = agenda;

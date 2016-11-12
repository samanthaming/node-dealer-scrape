var Agenda = require('agenda');

var agenda = new Agenda({ db: { address: 'mongodb://127.0.0.1/agenda', collection: 'agendaJobs' } });

agenda.define('greet the world', function(job, done) {
  console.log('Hello!');
  done();
});

agenda.on('ready', function() {
    agenda.start(); 
    agenda.every('5 seconds', 'greet the world', { time: new Date() });
});

module.exports = agenda;

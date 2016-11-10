var express = require('express');
var router = express.Router();
var _ = require("lodash");

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/scrape_app');

var request = require('request');
var cheerio = require('cheerio');
var jsdom = require("jsdom");
var _ = require("lodash");

var Verizon = require('../models/verizon');


router.post('/', function (req, res, next) {

  url = 'https://www.verizonwireless.com/plans/verizon-plan/';

  request(url, function (error, response, html) {

    if (!error) {
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

          console.log('User created!');
        });

          res.send(scrapeJson); 
             res.redirect('/result'); 
        }
      });
    }
  });

});

module.exports = router;
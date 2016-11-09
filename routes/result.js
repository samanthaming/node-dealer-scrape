var express = require('express');
var router = express.Router();

var request = require('request');
var cheerio = require('cheerio');
var jsdom = require("jsdom");
var _ = require("lodash");

/**
 * Get the Keys from Scraped Json data
 * @param {Json} jsonData {"data_plans": [{}]}
 * @returns {Array} Array of string 
 * Used for the Table Heading
 */
function _tableHeaders(jsonData) {
  return Object.keys(jsonData.data_plans[0]);
}


/* GET users listing. */
router.get('/', function (req, res, next) {

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

          var tableHeaders = _tableHeaders(scrapeJson);

          res.render('result', { results: scrapeJson, tableHeaders: tableHeaders }); 
        }
      });       
    }    
  });

  /**
   * CHEERIO METHOD
   */
  // url = 'https://www.verizonwireless.com/plans/verizon-plan/';

  // request(url, function(error, response, html){
  //   if(!error){
  //     var $ = cheerio.load(html);
     
  //     var scrape = $('.htmlscript script').eq(4).text();
  //     var scrapePreJson = scrape.split('= ')[1].split(';')[0];
  //     var scrapeJson = JSON.parse(scrapePreJson);
  //   }

  //   res.send(scrapeJson);
  // }); 

});

module.exports = router;

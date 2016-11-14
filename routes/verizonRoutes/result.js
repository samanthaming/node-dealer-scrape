var express = require('express');
var router = express.Router();

var request = require('request');
var cheerio = require('cheerio');
var jsdom = require("jsdom");
var _ = require("lodash");

var Verizon = require('../../models/verizon');

/**
 * Get the Keys from Scraped Json data
 * @param {Json} jsonData {"data_plans": [{}]}
 * @returns {Array} Array of string 
 * Used for the Table Heading
 */
function _tableHeaders(jsonData) {
  return Object.keys(jsonData.data_plans[0]);
}

/* GET results (index) */
router.get('/', function (req, res, next) {

  Verizon.
    find({}).
    sort({ createdAt: -1 }).
    select('createdAt').
    exec(function (err, verizons) {
      res.render('verizonViews/results', { plans: verizons });
    });
});


/* GET result (one) */
router.get('/:id', function (req, res, next) {

  Verizon.findById(req.params.id, function(err, verizon) {
    if (err) throw err;

    res.render('verizonViews/result', { plan: verizon });
  });

});

module.exports = router;

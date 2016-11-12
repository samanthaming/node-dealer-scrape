var express = require('express');
var router = express.Router();
var _ = require("lodash");

var Verizon = require('../models/verizon');

/* GET home page. */
router.get('/', function (req, res, next) {

  var ids = req.query.slugs.split(',');

  // Only take 2 ids 
  if (ids.length > 2) {
      ids = ids.splice(0, 2);     
  } else if (ids.length < 2) {
      res.send('Need to select 2 plans to compare');
  }

  Verizon.find({
    _id: {
      $in: ids
    }
  }).
  exec(function (err, results) {

    var array1 = results[0];
    var array2 = results[1];

    // Get all the data_sku add to key array

    var array1Key = array1.data_plans.map(function (obj) {
      return obj.data_sku;
    });

    var array2Key = array2.data_plans.map(function (obj) {
      return obj.data_sku;
    });

    // Join keys and remove duplicate    
    var keys = _.union(array1Key, array2Key);

    // Convert array to object using data_sku as key
    var newArray1 = {};
    var newArray2 = {};

    _.forEach(array1.data_plans, function (plan) {
      newArray1[plan.data_sku] = plan;
    });

    _.forEach(array2.data_plans, function (plan) {
      newArray2[plan.data_sku] = plan;
    });

    // Combine the Array
    var combined = {};

    _.forEach(keys, function (key) {
      // Add createdAt to array
      newArray1[key].createdAt = array1.createdAt;
      newArray2[key].createdAt = array2.createdAt;

      combined[key] = {
        planA: newArray1[key],
        planB: newArray2[key]
      };
    });

    res.render('compare', {
      combinedPlans: combined,
      skus: keys,
      planA: array1.createdAt,
      planB: array2.createdAt
    });
  });

});

module.exports = router;

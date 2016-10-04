var express = require('express');
var router = express.Router();
var CurrentRankings = require('../models/currentRankings');

var currentRankingsModel = new CurrentRankings();

router.get('/', function (req, res) {
  CurrentRankings.forge({}).fetchAll().then(function (collection) {
    res.json(collection.toJSON())
  });
});

module.exports = router;

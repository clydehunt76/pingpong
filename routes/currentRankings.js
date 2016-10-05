var express = require('express');
var router = express.Router();
var CurrentRankings = require('../models/currentRankings');

var currentRankingsModel = new CurrentRankings();

var config = require('config');
//...
var officeLocation = config.get('Office.location');

router.get('/', function(req, res) {
    CurrentRankings.forge({}).fetchAll().then(function(collection) {
        res.body = "A String"
        res.render('currentRankings', {
            location: officeLocation,
            currentTableJSON: collection.toJSON()
        });
    });
});

module.exports = router;

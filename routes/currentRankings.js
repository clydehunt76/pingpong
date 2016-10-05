var express = require('express');
var router = express.Router();
var CurrentRankings = require('../models/currentRankings');

var currentRankingsModel = new CurrentRankings();

var config = require('config');
//...
var officeLocation = config.get('Office.location');

router.get('/', function(req, res) {
    var rankingTableData, pendingTableData;
    CurrentRankings.forge({}).query('where', 'totalPlayed', '>', '2').fetchAll()
        .then(function(rankingCollection) {
            rankingTableData = (rankingCollection ? rankingCollection.toJSON() : {})
            return CurrentRankings.forge({}).query('where', 'totalPlayed', '<=', '2').fetchAll()
        })
        .then(function(pendingCollection) {
            pendingTableData = (pendingCollection ? pendingCollection.toJSON() : {})
            res.render('currentRankings', {
                location: officeLocation,
                rankingTableJSON: rankingTableData,
                pendingTableJSON: pendingTableData
            });
        });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var CurrentRankings = require('../models/currentRankings');

var currentRankingsModel = new CurrentRankings();

var config = require('config');
//...
var officeLocation = config.get('Office.location');

router.post('/', function(req, res) {
    new CurrentRankings(req.body).save()
        .then(function(model) {
            return CurrentRankings.forge({}).query('where', 'totalPlayed', '>', '2').fetchAll()
        })
        .then(function(rankingCollection) {
            rankingTableData = (rankingCollection ? rankingCollection.toJSON() : {})
            return CurrentRankings.forge({}).query('where', 'totalPlayed', '<=', '2').fetchAll()
        })
        .then(function(pendingCollection) {
            pendingTableData = (pendingCollection ? pendingCollection.toJSON() : {})
            res.redirect('/currentRankings');
        });
})

module.exports = router;

var express = require('express');
var router = express.Router();
var CurrentRankings = require('../models/currentRankings');

var currentRankingsModel = new CurrentRankings();

var config = require('config');
//...
var officeLocation = config.get('Office.location');

router.post('/', function(req, res) {
    CurrentRankings.forge({}).fetchAll({
            columns: ['player']
        })
        .then(function(playerCollection) {
            var playerFound = false;
            newPlayer = req.body;
            const playerNames = playerCollection.toJSON()
            playerNames.forEach((element) => {
                if (element.player == newPlayer.player) {
                    res.status(500).send('ERROR: Player already exists!');
                    playerFound = true;
                }
            })
            if (!playerFound) {
                new CurrentRankings(newPlayer).save().then(function(model) {
                    res.redirect('/currentRankings');
                })

            }
        });

})

module.exports = router;

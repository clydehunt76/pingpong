require('../helper');
var CurrentRankings = require('../../models/currentRankings')
var http = require('http');
var db = require('../../config/db');
var app = require('../../app');
var server;

var config = require('config');
//...

before(function(done) {
    server = http.createServer(require('../../app'));
    server.listen(0);
    browser.baseUrl = 'http://localhost:' + server.address().port;
    browser.ignoreSynchronization = true;
    db.knex.migrate.latest()
        .then(function() {
            return CurrentRankings.forge({}).fetchAll()
        })
        .then(function(collection) {
            collection.forEach(function(model) {
                model.destroy();
            });
            done();
        });
})

after(function() {
    server.close();
});

describe('Add Players', function() {

    beforeEach(function() {
        browser.get('/currentRankings');
    });

    describe('Fields and buttons available', function() {
        it("When I access the currentRankings page initially, the addPlayer button should be available", (done) => {
            element(by.buttonText('Add Player')).getTagName()
                .then(function(buttonTag) {
                    expect(buttonTag).to.equal("input");
                    done();
                })

        })

        it("When I access the currentRankings page initially, A player name input field should be available", (done) => {
            element(by.id('txtPlayerName')).getTagName()
                .then(function(playerInputBox) {
                    expect(playerInputBox).to.equal("input");
                    done();
                })

        })
    })

    describe('Add player Functionality', function() {
        it("When I supply a player name to the relevant input field and Add Player, details should appear in pending table", (done) => {
            element(by.id('txtPlayerName')).sendKeys("Clyde Hunt")
                .then(function(dataKeyed) {
                    return element(by.buttonText('Add Player')).click()
                })
                .then(function(buttonClicked) {
                    return element(by.id('tablePendingRankings')).getText()
                })
                .then(function(tableValues) {
                    expect(tableValues).to.equal("Player Played Won RankingScore\nClyde Hunt 0 0 0");
                    done();
                })
        })
    })
})

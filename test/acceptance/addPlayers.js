require('../helper');
var CurrentRankings = require('../../models/currentRankings')
var http = require('http');
var db = require('../../config/db');
var app = require('../../app');
var server;

var config = require('config');
//...

describe('Add Players', function() {

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
                CurrentRankings.forge({}).fetchAll().then(function(collection) {
                    done();
                })
            });
    })

    after(function() {
        server.close();
    });

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
                    browser.refresh();
                    return element(by.id('tablePendingRankings')).getText()
                })
                .then(function(tableValues) {
                    expect(tableValues).to.equal("Player Played Won RankingScore\nClyde Hunt 0 0 0");
                    done();
                })
        })
        it("When I supply a player name that already exists, and click Add Player, an error message should appear and the player should not be added", (done) => {
            element(by.id('txtPlayerName')).sendKeys("Clyde Hunt")
                .then(function(dataKeyed) {
                    return element(by.buttonText('Add Player')).click()
                })
                .then(function(buttonClicked) {
                    return element(by.id('divAddPlayerError')).getText()
                })
                .then(function(addPlayerError) {
                    expect(addPlayerError).to.equal("ERROR: Player already exists!");
                    done();
                })
        })
        it("When I supply another new player name, and click Add Player," +
            "error should disappear and new name should be in table", (done) => {
                element(by.id('txtPlayerName')).sendKeys("John Hunt")
                    .then(function(dataKeyed) {
                        return element(by.buttonText('Add Player')).click()
                    })
                    .then(function(buttonClicked) {
                        browser.refresh();
                        return element(by.id('tablePendingRankings')).getText()
                    })
                    .then(function(tableValues) {
                        expect(tableValues).to.equal("Player Played Won RankingScore\nClyde Hunt 0 0 0\nJohn Hunt 0 0 0");
                        return element(by.id('divAddPlayerError')).getText()
                    })
                    .then(function(addPlayerError) {
                        expect(addPlayerError).to.equal("");
                        done();
                    })
            })
    })
})

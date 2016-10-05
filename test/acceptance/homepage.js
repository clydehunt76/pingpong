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

describe('Home Page Tests', function() {

    beforeEach(function() {
        browser.get('/currentRankings');
    });

    describe('Empty Rankings Table Tests', function() {
        it("When I access the currentRankings page initially, the Current Rankins header should be visible", (done) => {
            element(by.id('headerDiv')).getText()
                .then(function(h1String) {
                    expect(h1String).to.match(/^Table Tennis Rankings/);
                    done();
                })

        })

        it("When I access the currentRankings page initially, the office location should be visible", (done) => {
            element(by.id('headerDiv')).getText()
                .then(function(h1String) {
                    var testLocation = config.get('Office.location');
                    var myRegex = new RegExp("(" + testLocation + ")");
                    expect(h1String).to.match(myRegex);
                    done();
                })

        })

        it("When I access the currentRankings page initially, an empty table should be visible", (done) => {
            element(by.id('tableRankings')).getText()
                .then(function(tableValues) {
                    expect(tableValues).to.equal("Player Played Won RankingScore");
                    done();
                })
        })

        it("When I access the currentRankings page with one row in the DB, that row data should be visible", (done) => {
            var firstPlayer = {
                player: 'Clyde Hunt',
                totalPlayed: 3,
                totalWon: 0,
                ranking: 0
            };
            new CurrentRankings(firstPlayer).save("id").then(function(model) {
                browser.get('/currentRankings');
                element(by.id('tableRankings')).getText()
                    .then(function(tableValues) {
                        expect(tableValues).to.equal("Player Played Won RankingScore\nClyde Hunt 3 0 0");
                        done();
                    })
            })
        })

        it("When I access the home page, I get redirected to the currentRankings page", (done) => {
            browser.get('/');
            browser.getCurrentUrl().then(function(currentURL) {
                expect(currentURL).to.match(/currentRankings$/);
                done();
            })
        })

        it("When I access the currentRankings page with one row in the DB having played less than 3 games," +
            " that row should be visible in the pending table", (done) => {
                var pendingPlayer = {
                    player: 'John Hunt',
                    totalPlayed: 2,
                    totalWon: 0,
                    ranking: 0
                };
                new CurrentRankings(pendingPlayer).save("id").then(function(model) {
                    browser.get('/currentRankings');
                    element(by.id('tablePendingRankings')).getText()
                        .then(function(tableValues) {
                            expect(tableValues).to.equal("Player Played Won RankingScore\nJohn Hunt 2 0 0");
                            done();
                        })
                })
            })
    })
})

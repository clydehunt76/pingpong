require('../helper');
var CurrentRankings = require('../../models/currentRankings')
var http = require('http');
var db = require('../../config/db');
var app = require('../../app');
var server;

var config = require('config');
//...

describe('Acceptance: Add Scores', function() {

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
        it("When I access the currentRankings page initially, the Add Result button should be available", (done) => {
            element(by.buttonText('Add Result')).getTagName()
                .then(function(buttonTag) {
                    expect(buttonTag).to.equal("input");
                    done();
                })

        })
        it("When I access the currentRankings page initially, A pair of radio buttons should exist for Singles/Doubles", (done) => {
            element(by.id('rbSinglesOrDoubles_Singles')).getAttribute("value")
                .then(function(singles) {
                    expect(singles).to.equal("1");
                    return element(by.id('rbSinglesOrDoubles_Doubles')).getAttribute("value")
                        .then(function(doubles) {
                            expect(doubles).to.equal("2");
                            done();
                        })
                })

        })
        it("When I select the Singles radio button, it shows checked and Doubles remains unchecked", (done) => {
            element(by.id('rbSinglesOrDoubles_Singles')).click()
                .then(function(isCLicked) {
                    return element(by.id('rbSinglesOrDoubles_Singles')).isSelected()
                })
                .then(function(isClicked) {
                    expect(isClicked).to.equal(true);
                    return element(by.id('rbSinglesOrDoubles_Doubles')).isSelected()
                })
                .then(function(isClicked) {
                    expect(isClicked).to.equal(false);
                    done();
                })
        })
        it("When I select the Doubles radio button, it shows checked and Singles remains unchecked", (done) => {
            element(by.id('rbSinglesOrDoubles_Doubles')).click()
                .then(function(isCLicked) {
                    return element(by.id('rbSinglesOrDoubles_Doubles')).isSelected()
                })
                .then(function(isClicked) {
                    expect(isClicked).to.equal(true);
                    return element(by.id('rbSinglesOrDoubles_Singles')).isSelected()
                })
                .then(function(isClicked) {
                    expect(isClicked).to.equal(false);
                    done();
                })
        })
    })

    describe('Singles Buttons', function() {
        it("When I select the Singles radio button, Player 1 & Player 2 select boxes are enabled", (done) => {
            element(by.id('rbSinglesOrDoubles_Singles')).click()
                .then(function(isCLicked) {
                    return element(by.id('Pair1Player1')).getAttribute("disabled")
                        .then(function(isDisabled) {
                            expect(isDisabled).to.equal(null);
                            return element(by.id('Pair1Player2')).getAttribute("disabled")
                        })
                        .then(function(isDisabled) {
                            expect(isDisabled).to.equal("true");
                            return element(by.id('Pair2Player1')).getAttribute("disabled")
                        })
                        .then(function(isDisabled) {
                            expect(isDisabled).to.equal(null);
                            return element(by.id('Pair2Player2')).getAttribute("disabled")
                        })
                        .then(function(isDisabled) {
                            expect(isDisabled).to.equal("true");
                            done()
                        })
                })
        })
    })

    describe('Doubles Buttons', function() {
        it("When I select the Doubles radio button, all player select boxes are enabled", (done) => {
            element(by.id('rbSinglesOrDoubles_Doubles')).click()
                .then(function(isCLicked) {
                    return element(by.id('Pair1Player1')).getAttribute("disabled")
                        .then(function(isDisabled) {
                            expect(isDisabled).to.equal(null);
                            return element(by.id('Pair1Player2')).getAttribute("disabled")
                        })
                        .then(function(isDisabled) {
                            expect(isDisabled).to.equal(null);
                            return element(by.id('Pair2Player1')).getAttribute("disabled")
                        })
                        .then(function(isDisabled) {
                            expect(isDisabled).to.equal(null);
                            return element(by.id('Pair2Player2')).getAttribute("disabled")
                        })
                        .then(function(isDisabled) {
                            expect(isDisabled).to.equal(null);
                            done()
                        })
                })
        })
    })
})

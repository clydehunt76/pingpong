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
        it("When I access the home page initially, the Current Rankins header should be visible", (done) => {
            element(by.id('headerDiv')).getText()
                .then(function(h1String) {
                    expect(h1String).to.match(/^Table Tennis Rankings/);
                    done();
                })

        })

        it("When I access the home page initially, the office location should be visible", (done) => {
            element(by.id('headerDiv')).getText()
                .then(function(h1String) {
                    var testLocation = config.get('Office.location');
                    var myRegex = new RegExp("(" + testLocation + ")");
                    expect(h1String).to.match(myRegex);
                    done();
                })

        })
    })
})

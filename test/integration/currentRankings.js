var request = require('supertest');
var app = require('../../app');
var CurrentRankings = require('../../models/currentRankings')
var db = require('../../config/db');

describe('currentRankings', function() {
    before(function(done) {
        db.knex.migrate.latest()
            .then(function() {
                done();
            });
    });
    beforeEach(function(done) {
        CurrentRankings.forge({}).fetchAll().then(function(collection) {
            collection.forEach(function(model) {
                model.destroy();
            });
            done();
        });
    })

    describe('GET /currentRankings', function() {
        it('returns a list of currentRankings from the database', function(done) {
            var firstPlayer = {
                player: 'Clyde Hunt',
                totalPlayed: 3,
                totalWon: 0,
                ranking: 0
            };
            new CurrentRankings(firstPlayer).save("id").then(function(model) {
                request(app).get('/currentRankings')
                    .end(function(req, res) {
                        expect(res.status).to.equal(200);
                        done();
                    })
            })
        })
    })

    describe('GET /', function() {
        it('redirects to /currentRankings', function(done) {
            request(app).get('/')
                .end(function(req, res) {
                    expect(res.status).to.equal(302);
                    done();
                })
        })
    })
})

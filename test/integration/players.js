var request = require('supertest');
var app = require('../../app');
var CurrentRankings = require('../../models/currentRankings')
var db = require('../../config/db');

describe('Integration: players', function() {
    before(function(done) {
        db.knex.migrate.latest()
            .then(function() {
                CurrentRankings.forge({}).fetchAll().then(function(collection) {
                    collection.forEach(function(model) {
                        model.destroy();
                    });
                    done();
                });
            });
    })

    describe('POST /players', function() {
        it('adds a new player to the currentRankings table in the database', function(done) {
            var firstPlayer = {
                player: 'Clyde Hunt',
                totalPlayed: 0,
                totalWon: 0,
                ranking: 0
            };
            request(app)
                .post('/players')
                .send(firstPlayer)
                .end(function(err, res) {
                    if (err) {
                        done(err);
                    } else {
                        expect(res.status).to.equal(302);
                        done();
                    }
                })
        })

        it('will error if player already exists', function(done) {
            var firstPlayer = {
                player: 'Clyde Hunt',
                totalPlayed: 0,
                totalWon: 0,
                ranking: 0
            };
            request(app)
                .post('/players')
                .send(firstPlayer)
                .end(function(err, res) {
                    if (err) {
                        done(err);
                    } else {
                        //                      console.log("Response:", res)
                        expect(res.status).to.equal(500);
                        done();
                    }
                })
        })
    })
})

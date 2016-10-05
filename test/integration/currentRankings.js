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
                totalPlayed: 0,
                totalWon: 0,
                ranking: 0
            };
            new CurrentRankings(firstPlayer).save("id").then(function(model) {
                request(app).get('/currentRankings')
                    .end(function(req, res) {
                        expect(res.status).to.equal(200);
                        console.log("Resp:", res)
                        done();
                    })
            })
        })
    })
})

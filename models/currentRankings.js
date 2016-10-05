var db = require('../config/db');

var CurrentRankings = db.Model.extend({
    tableName: 'currentRankings'
});

module.exports = CurrentRankings;

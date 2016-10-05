exports.up = function(knex, Promise) {
    return knex.schema.table('currentRankings', function(table) {
        table.increments('playerID');
    });

};

exports.down = function(knex, Promise) {
    return knex.schema.table('currentRankings', function(table) {
        table.dropColumn('playerID');
    });
};

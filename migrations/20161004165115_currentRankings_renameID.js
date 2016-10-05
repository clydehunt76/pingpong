exports.up = function(knex, Promise) {
    return knex.schema.table('currentRankings', function(table) {
        table.renameColumn('playerID', "id");
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('currentRankings', function(table) {
        table.renameColumn("id", 'playerID');
    });
};

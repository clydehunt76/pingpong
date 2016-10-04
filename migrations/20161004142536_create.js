
exports.up = function(knex, Promise) {
  return knex.schema.createTable('currentRankings', function (table) {
    table.string('player');
    table.integer('totalPlayed');
    table.integer('totalWon');
    table.decimal('ranking', 10, 2)
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('currentRankings')
};

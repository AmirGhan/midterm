exports.up = function(knex, Promise) {
  return knex.schema.table('polls', function(t) {
    t.boolean('status').defaultTo(true);
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.table('polls', function(t) {
    t.dropColumn('status');
  });

};

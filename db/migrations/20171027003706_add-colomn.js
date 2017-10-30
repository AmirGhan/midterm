exports.up = (knex, Promise) => {
  return knex.schema.table('polls', (t) => {
    t.boolean('status').defaultTo(true);
  });

};

exports.down = (knex, Promise) => {
  return knex.schema.table('polls', (t) => {
    t.dropColumn('status');
  });

};

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('admins', function(table) {
      table.increments('id').primary();
      table.string('email');
      table.string('password');
    }),
    knex.schema.createTable('polls', function(table) {
      table.increments('id').primary();
      table.string('pollName');
      table.integer('admin_id').references('id').inTable('admins');
    }),
    knex.schema.createTable('options', function(table) {
      table.increments('id').primary();
      table.string('optionName');
      table.integer('poll_id').references('id').inTable('polls');
    }),
    knex.schema.createTable('votes', function(table) {
      table.increments('id').primary();
      table.integer('option_id').references('id').inTable('options');
      table.integer('rank');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('votes'),
    knex.schema.dropTable('options'),
    knex.schema.dropTable('polls'),
    knex.schema.dropTable('admins')
  ])
};

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table){
      table.increments('id').primary();
    }),
    knex.schema.createTable('admins', function(table) {
      table.increments('id').primary();
      table.string('email');
    }),
    knex.schema.createTable('polls', function(table) {
      table.increments('id').primary();
      table.integer('admin_id').references('id').inTable('admins');
    }),
    knex.schema.createTable('users_polls', function(table) {
      table.integer('user_id').references('id').inTable('users');
      table.integer('poll_id').references('id').inTable('polls');
    }),
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users_polls'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('polls'),
    knex.schema.dropTable('admins')
  ])
};

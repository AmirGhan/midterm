exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments();
    table.string('name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};





// exports.up = function(knex, Promise) {
//   return knex.schema.createTable('users', function (table) {
//     table.increments('id').primary();
//   });
// };
//
// exports.down = function(knex, Promise) {
//   return knex.schema.dropTable('users');
// };

// exports.up = function(knex, Promise) {
//   return knex.schema.createTable('admins', function (table) {
//     table.increments('id').primary();
//     table.string('email');
//   });
// };
//
// exports.down = function(knex, Promise) {
//   return knex.schema.dropTable('admins');
// };

// exports.up = function(knex, Promise) {
//   return knex.schema.createTable('polls', function (table) {
//     table.increments('id').primary();
//     table.string('email');
//   });
// };
//
// exports.down = function(knex, Promise) {
//   return knex.schema.dropTable('polls');
// };

// exports.up = function(knex, Promise) {
//   return knex.schema.createTable('users_polls', function (table) {
//   });
// };
//
// exports.down = function(knex, Promise) {
//   return knex.schema.dropTable('users_polls');
// };

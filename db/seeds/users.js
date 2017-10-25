exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, name: 'Alice'}),
        knex('users').insert({id: 2, name: 'Bob'}),
        knex('users').insert({id: 3, name: 'Charlie'})
      ]);
    });
};


// exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('users').del().then(function() {
      knex('users').insert({name: 'Dilan'})
    }),
    knex('admins').del().then(function() {
      knex('admins').insert({email: 'dilan@example.com'})
    }),
    knex('polls').del().then(function() {
      knex('polls').insert()
    }),
  ])

//   return knex('users').del()
//     .then(function () {
//       return Promise.all([
//         knex('users').insert({id: 1, name: 'Alice'}),
//         knex('users').insert({id: 2, name: 'Bob'}),
//         knex('users').insert({id: 3, name: 'Charlie'})
//       ]);
//     });
// };

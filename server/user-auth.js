//const bcrypt = require('bcrypt');

module.exports =  function makeAuthHelpers(knex) {
  return {
    addUser: function(email, password) {
      checkEmailUniqueness(email)
      .then(function(email) {
        return bcrypt.hash(password, 10);
      })
      .then(function(passwordDigest) {
        return knex('admins')
        .insert({
          email: email,
          password: passwordDigest
        })
      })
    },
  checkEmailUniqueness: function(email) {
    return new Promise(function(resolve, reject) {
      findByEmail(email, knex)
      .then(function(user) {
      if (user) {
        return reject({
          type: 409,
          message: 'email has already been used'
        })
      } else {
        return resolve(email)
      }
    })
  })
},
findByEmail: function(email, callback) {
      return new Promise(function(resolve, reject) {
        knex('admins')
        .select('*')
        .where({email: email})
        .limit(1)
        .then(function(rows) {
          user = rows[0]
          callback(null, user);
          return resolve(user)
        })
        .catch((error) => reject(error));
      })
    }

// module.exports = function makeAuthHelpers(knex) {
//   return {
//   addUser: function(email, password, callback) {
//     //syntax
//     return checkEmailUniqueness(email, knex)
//     .then((email)=>{
//       return bcrypt.hash(password, 10);
//     })
//     .then((passwordDigest)=>{
//       return knex('admins')
//       .returning('id')
//       .insert({
//         email: email,
//         password: passwordDigest
//       })
//       .then((result) => {
//         console.log(result)
//         callback(null, result)
//       })
//       .catch((err)=>{
//         callback(err)
//       })
//     })
//   }
  }
}

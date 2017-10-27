// const bcrypt = require('bcrypt');

module.exports = function makeAuthHelpers(knex) {
  return {
    addUser: function(email, password) {
      checkEmailUniqueness(email)
      .then((email)=>{
        return bcrypt.hash(password, 10);
      })
      .then((passwordDigest)=>{
        return knex('admins').insert({
          email: email,
          password_digest: passwordDigest
        })
      })
    },
  checkEmailUniqueness: function(email) {
    return new Promise((resolve, reject) => {
      findByEmail(email)
      .then((user) => {
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
    findByEmail: function(email) {
    return new Promise((resolve, reject) => {
      knex('admins')
      .select('*')
      .where({email: email})
      .limit(1)
      .then((rows) => {
        user = rows[0]
        return resolve(user)
      })
      .catch((error) => reject(error));
    })
  }
  }
}

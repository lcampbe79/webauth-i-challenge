const db = require('../database/dbConfig');

module.exports = {
  find,
  findBy,
  findById,
  add
}

function find() {
  return db('users')
    .select('id', 'username')
}

function findBy(filter) {
  return db('users')
    .where(filter)
    .first()
}

function findById(id) {
  return db('users')
    // .select('id', 'username')
    .where({id})
    .first();
}

function add (user) {
  return db('users')
    .insert(user, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id)
    });
}

// async function add(user) {
//   const [id] = await db('users').insert(user);

//   return findById(id);
// }
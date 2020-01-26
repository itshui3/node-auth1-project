
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'rowValue1', hashed_password: },
        {id: 2, username: 'rowValue2', hashed_password: },
        {id: 3, username: 'rowValue3', hashed_password: }
      ]);
    });
};

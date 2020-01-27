
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments().unsigned();
    table.string('username', 30)
      .notNullable()
      .unique();
    table.string('password', 60)
      .notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};

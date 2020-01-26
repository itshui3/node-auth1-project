
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    // users table needs 2 columns: username and hashedpassword
    table.increments().unsigned();

    table.string('username', 30).notNullable().unique();
    table.string('hashed_password', 60).notNullable();
    
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};

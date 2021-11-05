exports.up = function (knex) {
    
    return knex.schema.createTable("User", (table) => {
      table.increments();
      table.string("Nickname");
      table.string("Email");
      table.string("Password");
      table.string("Image");
      table.timestamps(true, true);
    });
    
  };
  
  exports.down = function (knex) {};
  
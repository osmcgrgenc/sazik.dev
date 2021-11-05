exports.up = function (knex) {
    knex.schema.createTable("Code", (table) => {
      table.increments();
      table.string("CodeName");
      table.string("CodeLanguage");
      table.integer("IsActive");
      table.integer("UserId");
      table.timestamps(true, true);
    });
    knex.schema.createTable("User", (table) => {
      table.increments();
      table.string("Nickname");
      table.string("Email");
      table.string("Password");
      table.string("Image");
      table.timestamps(true, true);
    });
    return knex.schema.createTable("UserCode", (table) => {
      table.increments();
      table.integer("UserId");
      table.integer("CodeId");
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {};
  
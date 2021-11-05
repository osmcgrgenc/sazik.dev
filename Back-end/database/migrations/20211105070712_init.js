exports.up = function (knex) {
    return knex.schema.createTable("Code", (table) => {
      table.increments();
      table.string("CodeName");
      table.string("CodeLanguage");
      table.integer("IsActive");
      table.integer("UserId");
      table.timestamps(true, true);
    });
    
  };
  
  exports.down = function (knex) {};
  
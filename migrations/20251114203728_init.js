exports.up = function(knex) {
    return knex.schema.createTable("game_results", (table) => {
      table.increments("id").primary();
      table.text("user_id");             // optional for future personal stats
      table.date("game_date").notNullable();
      table.integer("guesses");          // number of guesses (1-6)
      table.boolean("won").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("game_results");
  };
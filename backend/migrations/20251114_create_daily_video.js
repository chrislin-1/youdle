exports.up = function(knex) {
    return knex.schema.hasTable("daily_video").then(exists => {
      if (!exists) {
        return knex.schema.createTable("daily_video", table => {
          table.increments("id").primary();
          table.string("videoId").notNullable();
          table.date("date").notNullable();
          table.timestamp("created_at").defaultTo(knex.fn.now());
        });
      }
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("daily_video");
  };
  
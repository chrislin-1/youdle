module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "interchange.proxy.rlwy.net",
      user: "postgres",
      password: "CvdwujClMKSgjyioPVSAFvWodTlvDQWj",
      database: "railway",
      port: 37104,
      ssl: { rejectUnauthorized: false } // needed for Railway
    },
    migrations: {
      directory: "./migrations"
    }
  }
};

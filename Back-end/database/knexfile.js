const { knexSnakeCaseMappers } = require("objection");

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: "ec2-34-249-247-7.eu-west-1.compute.amazonaws.com",
      port: 5432,
      database: "dfl3ljar0539qh",
      user: "ogrnpmrnjcqzqj",
      password:
        "807ee7fa5bb9ac337349ec96c4a8e18a253c8bceee07b07d842d7a72d76c6f19",
      ssl: {
        rejectUnauthorized: false,
      },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds",
    },
    // automatically convert camelCase to snake case
    // so table names are in snake case
    // but we can use camelCase fields per default
    // ...knexSnakeCaseMappers(),
  },
};
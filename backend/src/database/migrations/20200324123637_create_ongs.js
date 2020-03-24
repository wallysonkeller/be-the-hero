const ongConfig = require('../entities/OngEntity');

exports.up = function (knex) {
  return knex.schema.createTable(ongConfig.tableName, function (table) {
    table.string(ongConfig.id).primary();
    table.string(ongConfig.name).notNullable();
    table.string(ongConfig.email).notNullable();
    table.string(ongConfig.whatsapp).notNullable();
    table.string(ongConfig.city).notNullable();
    table.string(ongConfig.uf, 2).notNullable();
  });
};

//npx knex migrate:rollback
exports.down = function (knex) {
  return knex.schema.dropTable(ongConfig.tableName);
};
const ongEntity = require('../entities/OngEntity');

exports.up = function (knex) {
  return knex.schema.createTable(ongEntity.tableName, function (table) {
    table.string(ongEntity.id).primary();
    table.string(ongEntity.name).notNullable();
    table.string(ongEntity.email).notNullable();
    table.string(ongEntity.whatsapp).notNullable();
    table.string(ongEntity.city).notNullable();
    table.string(ongEntity.uf, 2).notNullable();
  });
};

//npx knex migrate:rollback
exports.down = function (knex) {
  return knex.schema.dropTable(ongEntity.tableName);
};
const incidentConfig = require('../entities/IncidentEntity');
const ongConfig = require('../entities/OngEntity');

exports.up = function (knex) {
  return knex.schema.createTable(incidentConfig.tableName, function (table) {
    table.increments();
    table.string(incidentConfig.title).notNullable();
    table.string(incidentConfig.description).notNullable();
    table.decimal(incidentConfig.value).notNullable();

    table.string(incidentConfig.ong_id).notNullable();
    table.foreign(incidentConfig.ong_id).references(ongConfig.id).inTable(ongConfig.tableName);
  });
};

//npx knex migrate:rollback
exports.down = function (knex) {
  return knex.schema.dropTable(incidentConfig.tableName);
};
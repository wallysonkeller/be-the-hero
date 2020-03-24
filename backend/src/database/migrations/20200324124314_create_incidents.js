const incidentEntity = require('../entities/IncidentEntity');
const ongEntity = require('../entities/OngEntity');

exports.up = function (knex) {
  return knex.schema.createTable(incidentEntity.tableName, function (table) {
    table.increments();
    table.string(incidentEntity.title).notNullable();
    table.string(incidentEntity.description).notNullable();
    table.decimal(incidentEntity.value).notNullable();

    table.string(incidentEntity.ong_id).notNullable();
    table.foreign(incidentEntity.ong_id).references(ongEntity.id).inTable(ongEntity.tableName);
  });
};

//npx knex migrate:rollback
exports.down = function (knex) {
  return knex.schema.dropTable(incidentEntity.tableName);
};
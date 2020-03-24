const connection = require('../database/connection');

const incidentEntity = require('../database/entities/IncidentEntity');

module.exports = {
  async index(request, response) {
    const ong_id = request.headers.authorization;

    const incidents = await connection(incidentEntity.tableName).where(incidentEntity.ong_id, ong_id).select('*');
    var result = response.json(incidents);
    return result;
  }
};
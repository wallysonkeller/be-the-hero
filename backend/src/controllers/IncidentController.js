const connection = require('../database/connection');

const incidentConfig = require('../database/entities/IncidentEntity');
const ongConfig = require('../database/entities/OngEntity');

module.exports = {
  async index(request, response) {
    const pageSize = 5;
    const { page = 1 } = request.query;

    const [count] = await connection(incidentConfig.tableName).count(`${incidentConfig.id} as total`);
    response.header('X-Total-Count', count['total']);

    const incidents = await connection(incidentConfig.tableName)
      .join(ongConfig.tableName, `${ongConfig.tableName}.${ongConfig.id}`, '=', `${incidentConfig.tableName}.${incidentConfig.ong_id}`)
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .select([
        `${incidentConfig.tableName}.*`,
        `${ongConfig.tableName}.${ongConfig.name}`,
        `${ongConfig.tableName}.${ongConfig.email}`,
        `${ongConfig.tableName}.${ongConfig.whatsapp}`,
        `${ongConfig.tableName}.${ongConfig.city}`,
        `${ongConfig.tableName}.${ongConfig.uf}`]);
    var result = response.json(incidents);
    return result;
  },

  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;
    const incident = { title, description, value, ong_id };

    const [id] = await connection(incident.tableName).insert(incident);
    const result = response.json({ id });
    return result;
  },

  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection(incident.tableName).where(incidentConfig.id, id).select(incidentConfig.ong_id).first();
    if (!incident || incident.ong_id !== ong_id)
      return response.status(401).json({ error: 'Operation not permitted.' });

    await connection(incident.tableName).where(incidentConfig.id, id).delete();
    return response.status(204).send();
  }
};
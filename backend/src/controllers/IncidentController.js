const connection = require('../database/connection');

const incidentEntity = require('../database/entities/IncidentEntity');
const ongEntity = require('../database/entities/OngEntity');

module.exports = {
  async index(request, response) {
    const pageSize = 5;
    const { page = 1 } = request.query;

    const [count] = await connection(incidentEntity.tableName).count(`${incidentEntity.id} as total`);
    response.header('X-Total-Count', count['total']);

    const incidents = await connection(incidentEntity.tableName)
      .join(ongEntity.tableName, `${ongEntity.tableName}.${ongEntity.id}`, '=', `${incidentEntity.tableName}.${incidentEntity.ong_id}`)
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .select([
        `${incidentEntity.tableName}.*`,
        `${ongEntity.tableName}.${ongEntity.name}`,
        `${ongEntity.tableName}.${ongEntity.email}`,
        `${ongEntity.tableName}.${ongEntity.whatsapp}`,
        `${ongEntity.tableName}.${ongEntity.city}`,
        `${ongEntity.tableName}.${ongEntity.uf}`]);
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

    const incident = await connection(incident.tableName).where(incidentEntity.id, id).select(incidentEntity.ong_id).first();
    if (!incident || incident.ong_id !== ong_id)
      return response.status(401).json({ error: 'Operation not permitted.' });

    await connection(incident.tableName).where(incidentEntity.id, id).delete();
    return response.status(204).send();
  }
};
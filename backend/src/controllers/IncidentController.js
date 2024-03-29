const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const pageSize = 5;
    const { page = 1 } = request.query;

    const [count] = await connection('incidents').count('id as total');
    response.header('X-Total-Count', count['total']);

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf']);
    var result = response.json(incidents);
    return result;
  },

  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;
    const incident = { title, description, value, ong_id };

    const [id] = await connection('incidents').insert(incident);
    const result = response.json({ id });
    return result;
  },

  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection('incidents').where('id', id).select('ong_id').first();
    if (!incident || incident.ong_id !== ong_id)
      return response.status(401).json({ error: 'Operation not permitted.' });

    await connection('incidents').where('id', id).delete();
    return response.status(204).send();
  },
};
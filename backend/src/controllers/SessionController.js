const connection = require('../database/connection');

const ongEntity = require('../database/entities/OngEntity');

module.exports = {
  async create(request, response) {
    const { id } = request.body;

    const ong = await connection(ongEntity.tableName).where(ongEntity.id, id).select(ongEntity.name).first();
    if (!ong)
      return response.status(400).json({ error: 'No ONG found with ID' });

    const result = response.json(ong);
    return result;
  },
};
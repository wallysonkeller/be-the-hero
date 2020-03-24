const connection = require('../database/connection');

const ongConfig = require('../database/entities/OngEntity');

module.exports = {
  async create(request, response) {
    const { id } = request.body;

    const ong = await connection(ongConfig.tableName).where(ongConfig.id, id).select(ongConfig.name).first();
    if (!ong)
      return response.status(400).json({ error: 'No ONG found with ID' });

    const result = response.json(ong);
    return result;
  }
};
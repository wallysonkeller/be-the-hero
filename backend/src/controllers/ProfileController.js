const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const ong_id = request.headers.authorization;

    const incidents = await connection('incidents').where('ong_id', ong_id).select('*');
    var result = response.json(incidents);
    return result;
  },
};
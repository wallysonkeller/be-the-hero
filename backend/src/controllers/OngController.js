const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const ongs = await connection('ongs').select('*');
    var result = response.json(ongs);
    return result;
  },
  
  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;
    const id = crypto.randomBytes(4).toString('HEX');

    const ong = { id, name, email, whatsapp, city, uf };
    await connection('ongs').insert(ong)

    let result = response.json({ id });
    return result;
  }
};
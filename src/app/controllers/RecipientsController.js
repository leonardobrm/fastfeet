import Recipients from '../models/Recipients';

class RecipientsController {
  async store(req, res) {
    const {
      name,
      street,
      number,
      complement,
      state,
      city,
      cep,
      ssn,
    } = await Recipients.create(req.body);

    return res.json({
      name,
      street,
      number,
      complement,
      state,
      city,
      cep,
      ssn,
    });
  }
}
export default new RecipientsController();

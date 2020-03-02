import * as Yup from 'yup';
import Recipients from '../models/Recipients';

class RecipientsController {
  async store(req, res) {
    const schema = await Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number()
        .required()
        .min(1),
      complement: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep: Yup.string()
        .required()
        .min(9),
      ssn: Yup.number()
        .required()
        .min(9),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const RecipientsExists = await Recipients.findOne({
      where: { ssn: req.body.ssn },
    });

    if (RecipientsExists) {
      return res.status(400).json({ error: 'Recipients already exists' });
    }

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

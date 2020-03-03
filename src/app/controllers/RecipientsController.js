import * as Yup from 'yup';
import Recipients from '../models/Recipients';

class RecipientsController {
  async store(req, res) {
    const schema = await Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep: Yup.string()
        .required()
        .min(9),
      ssn: Yup.string()
        .required()
        .min(9)
        .max(9),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const RecipientsExists = await Recipients.findOne({
      where: { ssn: req.body.ssn },
    });

    if (RecipientsExists) {
      return res.status(400).json({ error: 'Recipient already exists' });
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

  async update(req, res) {
    const schema = await Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.string(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      cep: Yup.string().min(9),
      ssn: Yup.string()
        .min(9)
        .max(9),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const { ssn } = req.body;
    const recipient = await Recipients.findByPk(id);

    if (!recipient) {
      return res.status(401).json({ error: 'recipient not found' });
    }

    if (ssn && ssn !== recipient.ssn) {
      const recipientExists = await Recipients.findOne({ where: { ssn } });

      if (recipientExists) {
        return res.status(400).json({ error: 'Recipient already exists.' });
      }
    }

    const {
      name,
      street,
      number,
      complement,
      state,
      city,
      cep,
    } = await recipient.update(req.body);

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

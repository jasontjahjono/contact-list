const router = require('express').Router();
let Contact = require('../models/contact.model');

router.route('/').get((req, res) => {
  Contact.find()
    .then(contacts => res.json(contacts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const contact_name = req.body.contact_name;
  const work_info = req.body.work_info;
  const phone = req.body.phone;
  const email = req.body.email;
  const address = req.body.address;
  const birthday = Date.parse(req.body.birthday);

  const newContact = new Contact({
    username,
    contact_name,
    work_info,
    phone,
    email,
    address,
    birthday,
  });
  newContact.save()
    .then(() => res.json('Contact added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Contact.findById(req.params.id)
    .then(contact => res.json(contact))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Contact.findByIdAndDelete(req.params.id)
    .then(() => res.json('Contact Deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Contact.findById(req.params.id)
    .then(contact => {
      contact.username = req.body.username;
      contact.contact_name = req.body.contact_name;
      contact.work_info = req.body.work_info;
      contact.phone = req.body.phone;
      contact.email = req.body.email;
      contact.address = req.body.address;
      contact.birthday = Date.parse(req.body.birthday);
      contact.save()
        .then(() => res.json('Contact Updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
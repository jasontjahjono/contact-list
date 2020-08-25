const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  username: { type: String, required: true },
  contact_name: { type: String, required: true },
  work_info: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  birthday: { type: Date, required: true },
}, {
  timestamps: true,
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
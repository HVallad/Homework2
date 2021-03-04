const Mongoose = require('mongoose');

module.exports = Mongoose.model('User', new Mongoose.Schema({
  SSN: { type: String, required: true, unique: true },
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Age: { type: Number, min: 0, required: true },
  Address: { type: String},
  PhoneNumber: {type: String}
}, {
  toJSON: {
    getters: true,
    virtuals: false,
  },
}));

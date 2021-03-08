const Mongoose = require('mongoose');

const UserSchema = new Mongoose.Schema({
  SSN: {
    type: String, required: true, unique: true, maxlength: 11,
  },
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Age: { type: Number, min: 0, required: true },
  Address: { type: String },
  PhoneNumber: { type: String },
}, {
  toJSON: {
    getters: true,
    virtuals: false,
  },
});

module.exports = Mongoose.model('User', UserSchema);

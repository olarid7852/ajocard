const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: [true, 'Hey, we dont allow nameless Zombies!'],
    maxlength: 120
  },
  last_name: {
    type: String,
    required: [true, 'Hey, we dont allow nameless Zombies!'],
    maxlength: 120
  },
  email: {
    type: String,
    required: [true, 'A valid email is required'],
    maxlength: 50,
    lowercase: true
  },
  phone_number: {
    type: String,
    unique: true,
    required: true,
    maxlength: 11
  },
  password: {
    type: String,
    maxlength: 128,
    required: true
  },
  is_agent: {
    type: Boolean,
    default: false
  },
  wallet_id: {
    type: String,
    maxlength: 12,
    required: true
  },
  wallet_balance: {
    type: Number,
    default: 10000
  },
  wallet_pin: {
    type: Number,
    default: 1234
  }
});

module.exports = model('User', UserSchema);

/* eslint-disable class-methods-use-this */
const { pick } = require('lodash');
const bcrypt = require('bcrypt');
const { SignUpSchema } = require('../schemas');
const User = require('../models/user.model');
const {
  errorResponse, createdResponse, invalidDataResponse
} = require('../utils/responses');

class AuthController {
  async signUp(req, res) {
    const data = req.body;
    const { error, value } = SignUpSchema.validate(data);
    if (error) return invalidDataResponse(error.message, res);
    try {
      const query = await User.findOne({ phone_number: value.phone_number });
      value.password = await bcrypt.hash(value.password, 10);
      value.wallet_id = value.first_name[0].toUpperCase() + value.last_name[0].toUpperCase() + value.phone_number.slice(1, 11);
      if (query) return errorResponse('Cannot add user', 'User already exists', res);
      const user = new User(value);
      const userData = await user.save(value);
      return createdResponse(pick(userData, ['first_name', 'last_name', 'email', 'wallet_id', 'wallet_pin', 'is_agent']),
        'User created successfully',
        res);
    } catch (err) {
      return errorResponse(err, 'An error occurred', res);
    }
  }
}

module.exports = AuthController;

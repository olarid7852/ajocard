const Joi = require('@hapi/joi');

const SignUpSchema = Joi.object().keys({
  first_name: Joi.string().required().max(30),
  last_name: Joi.string().required().max(30),
  email: Joi.string().email().required().max(50),
  password: Joi.string().required(),
  phone_number: Joi.string().max(11),
  is_agent: Joi.boolean()
});

const LoginSchema = Joi.object().keys({
  email: Joi.string().email().required().max(50),
  password: Joi.string().required()
});

const initTransactionSchema = Joi.object().keys({
  sender_wallet_id: Joi.string().required().max(12),
  receiver_wallet_id: Joi.string().required().max(12),
  wallet_pin: Joi.number().required(),
  amount: Joi.number().required()

});

const confirmTransactionSchema = Joi.object().keys({
  transaction_id: Joi.string().required().max(170),
  otp: Joi.number().required()
});

module.exports = {
  SignUpSchema, LoginSchema, confirmTransactionSchema, initTransactionSchema
};

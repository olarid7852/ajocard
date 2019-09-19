const { Schema, model } = require('mongoose');

const TransactionSchema = new Schema({
  amount: {
    type: Number,
    required: [true, 'Hey, you cant send without specifying the amount!']
  },
  sender_wallet_id: {
    type: String,
    maxlength: 12
  },
  receiver_wallet_id: {
    type: String,
    default: 12,
    required: true
  },
  wallet_pin: {
    type: Number,
    required: true
  },
  timestamps: {},
  otp: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Cancelled', 'Completed']
  },
  sender_details: {
    type: Object,
    required: true
  },
  receiver_details: {
    type: Object,
    required: true
  }
});

module.exports = model('Transactions', TransactionSchema);

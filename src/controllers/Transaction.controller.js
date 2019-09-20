/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
const { pick, isEmpty } = require('lodash');
const { confirmTransactionSchema, initTransactionSchema } = require('../schemas');
const Transactions = require('../models/transactions.model');
const User = require('../models/user.model');
const {
  errorResponse, createdResponse, invalidDataResponse,
  notFoundResponse, successResponse
} = require('../utils/responses');

class TransactionController {
  async initTransaction(req, res) {
    const data = req.body;
    // Validate data
    const { error, value } = initTransactionSchema.validate(data);
    if (error) return invalidDataResponse(error.message, res);
    try {
      // check sender and receiver detail
      const [sender, receiver] = await Promise.all([
        User.findOne({ wallet_id: value.sender_wallet_id }).select({
          password: 0, wallet_balance: 0, wallet_pin: 0 }),
        User.findOne({ wallet_id: value.receiver_wallet_id }).select({
          password: 0, wallet_balance: 0, wallet_pin: 0 })
      ]);
      // Return immediately if sender and receiver do not exist
      if (!sender) return notFoundResponse('Sender not found', res);
      if (!receiver) return notFoundResponse('Receiver not found', res);
      // Check PIN
      if (sender.wallet_pin !== value.wallet_pin) return errorResponse({}, 'Invalid PIN, Try again', res);
      // Check the sender balance
      if (sender.wallet_balance < value.amount) return errorResponse({}, 'Insufficient fund');
      // Set status to pending and create OTP
      value.sender_details = sender;
      value.receiver_details = receiver;
      value.status = 'Pending';
      delete value.wallet_pin;
      value.otp = Math.floor(Math.random() * 10000);
      sender.wallet_balance -= value.amount;
      // Remove amount from Sender
      // eslint-disable-next-line no-underscore-dangle
      const result = await User.findByIdAndUpdate(sender._id,
        { wallet_balance: sender.wallet_balance }, { new: true }).select({ wallet_balance: 1 });
      // SAve and init transactions
      if (result.wallet_balance === sender.wallet_balance) {
        const transaction = new Transactions(value);
        const tResult = await transaction.save();
        const senderName = tResult.sender_details.first_name;
        const receiverName = tResult.receiver_details.first_name;
        return createdResponse(pick(tResult, ['status', 'otp', 'amount', '_id']),
          `${senderName} is trying to send ${tResult.amount} to ${receiverName}. please enter OTP to continue`, res);
      }
    } catch (err) {
      return errorResponse(err, 'An error occurred', res);
    }
  }

  async confirmTransaction(req, res) {
    // Check input data
    const data = req.body;
    const { error, value } = confirmTransactionSchema.validate(data);
    if (error) return invalidDataResponse(error.message, res);
    try {
      // Find and validate Transaction
      const existingTransaction = await Transactions.findOne({ _id: value.transaction_id });
      if (!existingTransaction) return notFoundResponse('Invalid transaction', res);
      if (existingTransaction.otp !== value.otp) return notFoundResponse('Incorrect OTP supplied', res);
      // TODO: Revert money back to User

      const receiverDetails = existingTransaction.receiver_details;
      const newBalance = receiverDetails.wallet_balance + existingTransaction.amount;
      const [receiver, transaction] = await Promise.all([
      // eslint-disable-next-line no-underscore-dangle
        User.findByIdAndUpdate(receiverDetails._id, { wallet_balance: newBalance }),
        Transactions.findByIdAndUpdate(value.transaction_id, { status: 'Completed', otp: null }, { new: true })
      ]);
      return createdResponse(transaction,
        'Your transaction completed, money is transferred successfully', res);
    } catch (err) {
      return errorResponse(err, 'An error occurred', res);
    }
  }

  async getRecentTransaction(req, res) {
    try {
      const allTransactions = await Transactions.find();
      if (isEmpty(allTransactions)) return notFoundResponse('No recent transactions', res);
      return successResponse(allTransactions, 'All transactions', res);
    } catch (err) {
      return errorResponse(err, 'An error occurred', res);
    }
  }
}
module.exports = TransactionController;

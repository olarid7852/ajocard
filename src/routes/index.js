const { Router } = require('express');
const AuthController = require('../controllers/Auth.controller');
const TransactionController = require('../controllers/Transaction.controller');

const authRoutes = new AuthController();
const transactionsRoutes = new TransactionController();
const router = Router();

// Authentication Routes
router.post('/auth/signup', authRoutes.signUp)
// Transactions routes
  .post('/transfer', transactionsRoutes.initTransaction)
  .post('/confirm/transfer', transactionsRoutes.confirmTransaction)
  .get('/transactions', transactionsRoutes.getRecentTransaction);


module.exports = router;

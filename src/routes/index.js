const { Router } = require('express');
const AuthController = require('../controllers/Auth.controller');
const TransactionController = require('../controllers/Transaction.controller');
const UserController = require('../controllers/User.controller');

const authRoutes = new AuthController();
const transactionsRoutes = new TransactionController();
const userRoutes = new UserController();
const router = Router();

// Authentication Routes
router.post('/auth/signup', authRoutes.signUp)
// Transactions routes
  .post('/transfer', transactionsRoutes.initTransaction)
  .post('/confirm/transfer', transactionsRoutes.confirmTransaction)
  .get('/transactions', transactionsRoutes.getRecentTransaction)
//User routes
  .get('/users', usersRoutes.getUsers);
    
module.exports = router;

/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
const { pick, isEmpty } = require('lodash');
const User = require('../models/user.model');
const {
  errorResponse, createdResponse, invalidDataResponse,
  notFoundResponse, successResponse
} = require('../utils/responses');

class UserController {
 async getUsers(req, res) {
    // Check input data
    const  { type }= req.query;
    let allUsers;
    if (type === 'agent') {
	  allUsers = User.find({ is_agent: true}).select({ password: 0});
	} else if(type === 'user') {
		allUsers = User.find({ is_agent: false}).select({ password: 0}):
	} else {
		allUsers = User.find(	).select({ password: 0});
	}
    try {
      if (isEmpty(allUsers)) return notFoundResponse('No user found', res);
      return successResponse(allUsers, 'User found', res);
    } catch (err) {
      return errorResponse(err, 'An error occurred', res);
    }
  }
}
module.exports = UserController;

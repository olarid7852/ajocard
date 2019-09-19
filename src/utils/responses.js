const errorResponse = (error, message, res) => {
  const resp = {
    status: 'fail',
    error,
    message
  };
  return res.status(400).send(resp);
};

const successResponse = (data, message, res) => {
  const resp = {
    status: 'success',
    data,
    message
  };
  return res.status(422).send(resp);
};

const createdResponse = (data, message, res) => {
  const resp = {
    status: 'success',
    data,
    message
  };
  return res.status(201).send(resp);
};

const notFoundResponse = (message, res) => {
  const resp = {
    status: 'fail',
    message
  };
  return res.status(404).send(resp);
};

const invalidDataResponse = (message, res) => {
  const resp = {
    status: 'fail',
    message
  };
  return res.status(422).send(resp);
};


module.exports = {
  errorResponse, successResponse, notFoundResponse, invalidDataResponse, createdResponse
};

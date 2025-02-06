const { query } = require("express-validator");

const getUserValidationSchema = {
  filter: {
    notEmpty: {
      errorMessage: "Must not be empty",
    },
    isString: {
      errorMessage: "Filter must be a string",
    },
    isLength: {
      options: { min: 3, max: 10 },
      errorMessage: "Must be at least 3-10 characters",
    },
  },
};

const createUservalidationSchema = {
  username: {
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
    isString: {
      errorMessage: "Username must be string",
    },
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: "Username must be at least 5 characters with a max of 32 characters",
    },
  },
  place: {
    notEmpty: {
      errorMessage: "Place cannot be empty",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password cannot be empty",
    },
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: "Password must be at least 5 characters with a max of 32 characters",
    },
  },
};

module.exports = { createUservalidationSchema, getUserValidationSchema };

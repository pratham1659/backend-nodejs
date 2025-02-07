const validator = require("express-validator");
const helper = require("../utils/helper");
const { getUserByIdHandler, createUserHandler } = require("../handlers/userhandler");
const { hashPassword } = require("../utils/helper");
const User = require("../schemas/userSchema");
const { mockUsers } = require("../utils/constants");

// Mock express-validator functions
jest.mock("express-validator", () => ({
  validationResult: jest.fn(() => ({
    isEmpty: jest.fn(() => false),
    array: jest.fn(() => [{ msg: "Invalid Field" }]),
  })),
  matchedData: jest.fn(() => ({
    username: "test",
    password: "password",
    place: "test_name",
  })),
}));

// Mock helper functions
jest.mock("../utils/helper", () => ({
  hashPassword: jest.fn((password) => `hashed_${password}`),
}));

// Mock Mongoose User schema
jest.mock("../schemas/userSchema");

const mockRequest = {
  params: { id: "1" }, // Simulate Express `req.params.id`
};

const mockResponse = () => ({
  sendStatus: jest.fn(),
  json: jest.fn(), // ✅ Added `.json()` mock
  send: jest.fn(),
  status: jest.fn(function () {
    return this; // ✅ Allow method chaining
  }),
});

describe("get users", () => {
  let response;

  beforeEach(() => {
    jest.clearAllMocks();
    response = mockResponse();
  });

  it("should get user by id", () => {
    getUserByIdHandler(mockRequest, response);

    expect(response.json).toHaveBeenCalled();
    expect(response.json).toHaveBeenCalledWith(mockUsers[0]); // ✅ Fix index
    expect(response.json).toHaveBeenCalledTimes(1);
  });

  it("should call sendStatus with 404 when user not found", () => {
    const copyMockRequest = { params: { id: "100" } }; // Non-existent ID

    getUserByIdHandler(copyMockRequest, response);

    expect(response.sendStatus).toHaveBeenCalledWith(404);
    expect(response.sendStatus).toHaveBeenCalledTimes(1);
    expect(response.json).not.toHaveBeenCalled();
  });
});

describe("create users", () => {
  let request, response;

  beforeEach(() => {
    jest.clearAllMocks();
    request = { body: { username: "test", password: "password", place: "test_name" } }; // ✅ Fixed request
    response = mockResponse();
  });

  it("should return status of 400 when there are validation errors", async () => {
    await createUserHandler(request, response);

    expect(validator.validationResult).toHaveBeenCalledWith(request);
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith([{ msg: "Invalid Field" }]); // ✅ Use `.json()`
  });

  it("should return status of 201 and the user created", async () => {
    jest.spyOn(validator, "validationResult").mockImplementationOnce(() => ({
      isEmpty: jest.fn(() => true),
    }));

    const saveMethod = jest.spyOn(User.prototype, "save").mockResolvedValueOnce({
      username: "test",
      password: "hashed_password",
      place: "test_name",
    });

    await createUserHandler(request, response);

    expect(validator.matchedData).toHaveBeenCalledWith(request);
    expect(helper.hashPassword).toHaveBeenCalledWith("password");
    expect(helper.hashPassword).toHaveReturnedWith("hashed_password");
    expect(User).toHaveBeenCalledWith({
      username: "test",
      password: "hashed_password",
      place: "test_name",
    });

    expect(saveMethod).toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith({
      username: "test",
      password: "hashed_password",
      place: "test_name",
    });
  });

  it("should send status 400 when database fails to save user", async () => {
    jest.spyOn(validator, "validationResult").mockImplementationOnce(() => ({
      isEmpty: jest.fn(() => true),
    }));

    const saveMethod = jest.spyOn(User.prototype, "save").mockImplementationOnce(() => Promise.reject(new Error("Failed to save user")));

    await createUserHandler(request, response);

    expect(saveMethod).toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({ error: "Failed to save user" }); // ✅ Return error message
  });
});

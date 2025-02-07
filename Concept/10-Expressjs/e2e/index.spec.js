const request = require("supertest");
const createApp = require("../createApp");
const mongoose = require("mongoose");

describe("/api/pass", () => {
  let app;
  beforeAll(async () => {
    mongoose
      .connect("mongodb://localhost:27017/tutorial_test")
      .then(() => console.log("Connected to Test Database"))
      .catch((err) => console.log(`Error: ${err}`));
    app = createApp();
  });

  it("should return 401 when not logged in", async () => {
    const response = await request(app).get("/api/auth/getStatus");
    expect(response.statusCode).toBe(401);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});

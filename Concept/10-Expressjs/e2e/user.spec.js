const request = require("supertest");
const mongoose = require("mongoose");
const createApp = require("../createApp");

describe("Create user and login", () => {
  let app;

  beforeAll(async () => {
    mongoose
      .connect("mongodb://localhost:27017/tutorial_test")
      .then(() => console.log("Connected to Test Database"))
      .catch((err) => console.log(`Error: ${err}`));
    app = createApp();
  });

  it("should create the user", async () => {
    const response = await request(app).post("/api/users").send({
      username: "Adam",
      password: "adam123",
      place: "New York",
    });

    expect(response.statusCode).toBe(201);
  });

  // it("should log the user in and return authenticated user", async () => {
  //   const loginResponse = await request(app).post("/api/pass").send({
  //     username: "Adam",
  //     password: "adam123",
  //   });

  //   expect(loginResponse.statusCode).toBe(200);
  //   expect(loginResponse.headers["set-cookie"]).toBeDefined();

  //   const authStatusResponse = await request(app).get("/api/auth/getStatus").set("Cookie", loginResponse.headers["set-cookie"]);

  //   expect(authStatusResponse.statusCode).toBe(200);
  //   expect(authStatusResponse.body.username).toBe("Adam");
  //   expect(authStatusResponse.body.place).toBe("New York");
  // });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});

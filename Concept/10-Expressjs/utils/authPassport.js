const passport = require("passport");
const { Strategy } = require("passport-local");
const { mockUsers } = require("./constants");

passport.serializeUser((user, done) => {
  console.log(`Inside Serialize user`);
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log(`Inside Deserializer `);
  console.log(`Deserializer user ID: ${id}`);
  try {
    const findUser = mockUsers.find((user) => user.id == id);
    if (!findUser) throw new Error("User Not Found");
    done(null, findUser);
  } catch (error) {
    done(err, null);
  }
});

passport.use(
  new Strategy((username, password, done) => {
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    try {
      const findUser = mockUsers.find((user) => user.username === username);
      if (!findUser) throw new Error("user not found");
      if (findUser.password !== password) throw new Error("Invalid Credentials");
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
);

module.exports = passport;

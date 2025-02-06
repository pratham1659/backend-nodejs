const passport = require("passport");
const { Strategy } = require("passport-local");
const { mockUsers } = require("./constants");
const { comparePassword } = require("../utils/helper");
const User = require("../schemas/userSchema");

passport.serializeUser((user, done) => {
  console.log(`Inside Serialize user`);
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log(`Inside Deserializer `);
  console.log(`Deserializer user ID: ${id}`);
  try {
    const findUser = await User.findById(id);
    if (!findUser) throw new Error("User Not Found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new Strategy(async (username, password, done) => {
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    try {
      const findUser = await User.findOne({ username });
      if (!findUser) throw new Error("user not found");
      if (!comparePassword(password, findUser.password)) throw new Error("Bad Credentials");
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
);

// passport.use(
//   new Strategy((username, password, done) => {
//     console.log(`Username: ${username}`);
//     console.log(`Password: ${password}`);
//     try {
//       const findUser = mockUsers.find((user) => user.username === username);
//       if (!findUser) throw new Error("user not found");
//       if (findUser.password !== password) throw new Error("Invalid Credentials");
//       done(null, findUser);
//     } catch (err) {
//       done(err, null);
//     }
//   })
// );

module.exports = passport;

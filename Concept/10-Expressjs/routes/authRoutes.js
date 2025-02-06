const Router = require("express");
const router = Router();
const { mockUsers } = require("../utils/constants");
const session = require("express-session");
const passport = require("../utils/authPassport");
const User = require("../schemas/userSchema");

router.post("/api/auth", async (req, res) => {
  const { username, password } = req.body;

  try {
    const findUser = await User.findOne({ username });
    if (!findUser) {
      return res.status(404).json({ msg: "User not found" }); // ✅ Send proper response
    }

    if (findUser.password !== password) {
      return res.status(401).json({ msg: "Invalid Credentials" }); // ✅ Proper error response
    }

    req.session.user = findUser;
    return res.status(200).json(findUser); // ✅ Send JSON response
  } catch (err) {
    console.error("Authentication Error:", err);
    return res.status(500).json({ msg: "Internal Server Error" }); // ✅ Handle server errors
  }

  // const findUser = mockUsers.find((user) => user.username === username);
  // if (!findUser || findUser.password !== password) return res.status(401).send({ msg: "BAD CREDENTIALS" });
});

router.post("/api/pass", passport.authenticate("local"), (req, res) => res.json({ msg: "User authenticated successfully" }));

router.get("/api/auth/status", (req, res) => {
  req.sessionStore.get(req.sessionID, (err, session) => {
    console.log(session);
  });

  return req.session.user ? res.status(200).send(req.session.user) : res.status(401).send({ msg: "Not Authenticated" });
});

router.get("/api/auth/getStatus", (req, res) => {
  console.log(`Inside /auth/status endpoint`);
  console.log(req.user);
  console.log(req.session);
  return req.user ? res.status(200).send(req.user) : res.status(401).send({ msg: "Not Authenticated" });
});

router.post("/api/auth/logout", (req, res) => {
  if (!req.user) return res.status(401).send({ msg: "Not Authenticated" });

  req.logout((err) => {
    if (err) return res.sendStatus(400);
    res.status(200).send({ msg: "Logout Successfully" });
  });
});

module.exports = router;

const Router = require("express");
const router = Router();
const { mockUsers } = require("../utils/constants");
const session = require("express-session");
const passport = require("../utils/authPassport");

router.post("/api/auth", (req, res) => {
  const {
    body: { username, password },
  } = req;

  const findUser = mockUsers.find((user) => user.username === username);
  if (!findUser || findUser.password !== password) return res.status(401).send({ msg: "BAD CREDENTIALS" });

  req.session.user = findUser;
  return res.status(200).send(findUser);
});

router.post("/api/pass", passport.authenticate("local"), (req, res) => {
  res.send({ msg: "User authenticated successfully" });
});

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
  return req.user ? res.send(req.user) : res.sendStatus(401);
});

router.post("/api/auth/logout", (req, res) => {
  if (!req.user) return res.sendStatus(401);

  req.logout((err) => {
    if (err) return res.sendStatus(400);
    res.send(200);
  });
});

module.exports = router;

const { mockUsers } = require("../utils/constants");

const getuserByIdHandler = (req, res) => {
  const { findUserIndex } = req;
  const findUser = mockUsers[findUserIndex];

  if (!findUser) {
    return res.sendStatus(404);
  }

  return res.send(findUser);
};

module.exports = { getuserByIdHandler };

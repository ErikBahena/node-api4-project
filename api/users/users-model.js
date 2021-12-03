const data = require("../../data");
const bcrypt = require("bcrypt");

const find = () => {
  if (!data.length) return Promise.reject(new Error("no users in database"));
  else return Promise.resolve(data);
};

const register = async (userInfo) => {
  const foundUser = findUser(userInfo);
  if (foundUser)
    return Promise.reject(
      new Error("username already exists, try a different username")
    );

  userInfo.id = data.length + 1;
  userInfo.password = await bcrypt.hash(userInfo.password, 12);

  data.push(userInfo);

  return Promise.resolve(data[data.length - 1]);
};

const login = async (loginInfo) => {
  const foundUser = findUser(loginInfo);

  const match = await bcrypt.compare(loginInfo.password, foundUser.password);

  if (match) return Promise.resolve(`Welcome ${loginInfo.username}`);
  else return Promise.reject(new Error("user not found in database"));
};

const findUser = (userInfo) => {
  return data.find((user) => user.username === userInfo.username);
};

module.exports = {
  find,
  register,
  login,
};

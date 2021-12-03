const data = require("../../data");

const find = () => {
  if (!data.length) return Promise.reject(new Error("no data found"));
  else return Promise.resolve(data);
};

const register = (userInfo) => {
  const foundUser = data.find(
    (user) =>
      user.username === userInfo.username && user.password === userInfo.password
  );

  if (foundUser) return Promise.reject(new Error("user already exists"));

  userInfo.id = data.length + 1;

  data.push(userInfo);

  return Promise.resolve(data[data.length - 1]);
};

const login = (userInfo) => {
  const foundUser = data.find(
    (user) =>
      user.username === userInfo.username && user.password === userInfo.password
  );

  if (foundUser) return Promise.resolve(`Welcome ${userInfo.username}`);
  else return Promise.reject(new Error("user not found"));
};

module.exports = {
  find,
  register,
  login,
};

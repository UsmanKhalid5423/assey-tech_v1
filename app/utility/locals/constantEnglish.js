const constants = {
    SIGN_UP_COMPLETED: "User Profile registered successfully.",
  };
  module.exports = function (key) {
    return constants[key];
  };
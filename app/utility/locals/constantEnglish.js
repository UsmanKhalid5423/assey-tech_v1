const constants = {
    SIGN_UP_COMPLETED: "User Profile registered successfully.",
    ROUTE_NOT_AVAILABLE: "Requested route is not available",
    LOGGED_IN: "Login successfull",
    AUTHORIZATION_FAILED: "Invalid username or pasword"
  };
  module.exports = function (key) {
    return constants[key];
  };
const constants = {
    SIGN_UP_COMPLETED: "User Profile registered successfully.",
    ROUTE_NOT_AVAILABLE: "Requested route is not available",
    LOGGED_IN: "Login successfull",
    AUTHORIZATION_FAILED: "Invalid username or pasword",
    ALREADY_LOGGED_IN: "The user is already logged in.",
    LOGGED_OUT: "User logout successfull",
    DATA_NOT_AVAILABLE: "Data not available",
    UN_AUTHORIZED_USER: "Unauthorized user , you can not access the route.",
  };
  module.exports = function (key) {
    return constants[key];
  };
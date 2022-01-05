const constants = {
    SIGN_UP_COMPLETED: "User Profile registered successfully.",
    ROUTE_NOT_AVAILABLE: "Requested route is not available",
    LOGGED_IN: "Login successfull",
    AUTHORIZATION_FAILED: "Invalid username or password.",
    ALREADY_EXISTS: "Account already exists",
    ALREADY_LOGGED_IN: "The user is already logged in.",
    LOGGED_OUT: "User logout successfull.",
    DATA_NOT_AVAILABLE: "Data not available.",
    UN_AUTHORIZED_USER: "Unauthorized user , you can not access the route.",
    PROFILE_ADDED: "Profile added successfully.",
    PROFILE_UPDATED: "Profile updated successfully",
    PROFILE_ALREADY_EXISTS: "Profile already exists",
    LAB_ADDED: "lab added successfully.",
    LAB_UPDATED: "lab updated successfully",
    LAB_ALREADY_EXISTS: "lab already exists",
    FETCH_SUCCESSFULLY : "Records fetch successfully",
    TEST_ADDED: "Test added successfully",
    RESULT_ADDED: "Result added successfully",
    VERIFY_EMAIL: "An OTP is sent to your email. Kindly verify your email.",
    INCORRECT_OTP: "You enter an incorrect OTP password. Please try again."

  };
  module.exports = function (key) {
    return constants[key];
  };
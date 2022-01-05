/*******************************************************/
// Implementing Codes.
/*******************************************************/
const alphabeticCode = (length = 5) => {
    let code = "";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i <= length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

const alphabeticNumericCode = (length = 9) => {
    let code = "";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i <= length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

const otpCode = (length = 4) => {
    let code = "";
    const chars = "0123456789";
    for (var i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

/*******************************************************/
// Exporting Funtions.
/*******************************************************/
module.exports = {
    alphabeticCode,
    alphabeticNumericCode,
    otpCode
}
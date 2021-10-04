const jwt = require('jsonwebtoken');

const moment = require('moment');
const { BlockedToken } = require('../../models');

function createJwtToken(data, time = '365d') {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: time });
}
function generateOtp() {
  // Declare a digits variable
  // which stores all digits
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i += 1) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

function generateTempToken(attrs, time) {
  const jwtInfo = {
    // eslint-disable-next-line no-underscore-dangle
    ...attrs,
  };
  // generating permanent token
  return createJwtToken(jwtInfo, time);
}

async function verifyToken(rawToken) {
  const token = jwt.verify(rawToken, process.env.JWT_SECRET);
  const blocked = await BlockedToken.findOne({ token: rawToken });

  if (blocked) {
    throw new Error('Session is invalid or inactive.');
  }

  return token;
}

const blockAccessToken = (rawToken, tokenObject) => Promise.all([
  new BlockedToken({
    token: rawToken,
    expiry: moment.unix(tokenObject.exp),
  }).save(),
  // eslint-disable-next-line no-underscore-dangle
  // deleteUserDevice(tokenObject._id),
]);

module.exports = {
  // verifyUserStatus,
  createJwtToken,
  // generateAccessToken,
  generateOtp,
  // createLoginSession,
  blockAccessToken,
  // deleteUserDevice,
  generateTempToken,
  verifyToken,
};

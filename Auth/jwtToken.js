const jwt = require('jsonwebtoken');
require("dotenv").config();
const jwtSecretKey= process.env.ACCESS_TOKEN_SECRET
const refreshToken= process.env.REFRESH_TOKEN_SECRET

const generateJwtToken=(user)=>{
 return  jwt.sign({
    data: { id: user.id, email: user.email },
  }, jwtSecretKey, { expiresIn: '1m' });
}

const refreshJwtToken=(user)=>{
 return  jwt.sign({
    data:  { id: user.id, email: user.email },
  }, refreshToken, { expiresIn: Math.floor(Date.now()+ (7 * 24 * 60 * 60 * 1000 )/ 1000) , });
}

console.log(refreshToken)
module.exports= {generateJwtToken,refreshJwtToken}

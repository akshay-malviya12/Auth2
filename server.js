const express = require('express');
const register = require('./Auth/register');
const refreshToken = require('./Auth/tokenVerfy');
const login=require("./Auth/login")

const app = express();
app.use(express.json());

const port = 8080;

app.post("/register",register)
app.post("/login",login)
app.post("/refresh-token",refreshToken)
// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

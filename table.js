const dbCreate=`CREATE DATABASE IF NOT EXISTS authdb;`

const auth=`
CREATE TABLE IF NOT EXISTS auth (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  name VARCHAR(255),
  refresh_token TEXT
);
`

module.exports={auth,dbCreate}

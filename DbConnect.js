let mysql = require('mysql2');
const { auth,dbCreate } = require('./table');

let con = mysql.createConnection({
  host: "localhost",
  user: "userName",
  password: "Password",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  con.query(dbCreate,(err)=>{
    if(err) throw err;
    console.log("User DataBase ready")
  })
  con.query("USE authdb", (err) =>{
    if(err) throw err;
    console.log("User DataBase Select")
  })
  con.query(auth,(err)=>{
    if(err) throw err;
    console.log("User table ready")
  })
});

module.exports=con;

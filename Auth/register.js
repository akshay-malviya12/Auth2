const bcrypt=require("bcrypt")
const db=require("../DbConnect")
const register=async (req,resp)=>{
    const {email,password,name}=req.body

    if(!email && !password){
         return resp.status(400).json({Message:"Please enter username or password"})
    }
    
    db.query("SELECT * FROM auth WHERE email=?",[email],(err,row)=>{
        if(err){
            return resp.status(500).json({Mssage:"Db error"})
        }

     const user=row[0]
     if(user){
            return resp.status(401).json({Mssage:"user already exists."})
        }
  
    })
    const hashPassword=await  bcrypt.hash(password,11)
    db.query("INSERT INTO auth (email,password,name) VALUES (?,?,?)",[email,hashPassword,name],(err,result)=>{
      
        if(err){
            return resp.status(400).json({Message:err})
        }
        resp.status(201).json({Message:"user Register Successfully"})
    })
     
}

module.exports=register

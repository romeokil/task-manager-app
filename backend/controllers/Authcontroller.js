const User=require('../models/User.js')
const bcrypt =require('bcryptjs');
const salt=bcrypt.genSaltSync(10);
const jwt=require('jsonwebtoken')
const register=async (req,res)=>{
    const {username,password}=req.body;
    try{
        const user=await new User({username,
            password:bcrypt.hashSync(password,salt)});
        await user.save();
        console.log("User Created Successfully!!");
        res.json({
            user
        })
    }
    catch(error){
        console.log("Error block ghus gy",error);
        res.json("User not Created!!")
    }
}

const login=async(req,res)=>{
    const {username,password}=req.body;
    try{
        let checkusername=await User.findOne({username});
        // agr user exist hi ni krta ho toh
        if(!checkusername){
            res.status(404).json("You have not registered!!")
        }
        // agr krta hai toh password check krte hai
        let checkpassword=bcrypt.compareSync(password,checkusername.password);
        console.log(checkpassword)
        if(!checkpassword){
            res.status(404).json("You have entered wrong password");
        }
        let token=jwt.sign({username,id:checkusername._id},process.env.JWT_SECRET,{expiresIn:'1h'});
        console.log(token);
        res.status(201).cookie('token',token).json({
            checkusername
        })
    }
    catch(error){
        console.log("catch block ghus gy re",error)
        res.json("User has not registerd!!!")
    }
}

const logout=(req,res)=>{
    let {token}=req.cookies;
    console.log(token);
    try{
        if(token){
            let decoded=jwt.verify(token,process.env.JWT_SECRET);
            console.log(decoded);
            res.cookie('token','').json("Logout Done!!")
        }
        else if(!token){
            res.status(404).json("Sorry! You need to Signin first")
        }
    }
    catch(error){
        res.status(404).json({"error":error});
    }
   
}

const profile=(req,res)=>{
    const {token}=req.cookies;
    try{
        if(!token){
            res.status(404).json("Sorry!! but you are not signed in")
        }
        else{
            console.log("token hai")
        let decoded=jwt.verify(token,process.env.JWT_SECRET);
        res.status(201).json(decoded);
        }
    }
    catch(error){
        res.status(401).json("Sorry!! you need to create profile first1!!",error)
    }
}

module.exports={
    register,
    login,
    logout,
    profile
}
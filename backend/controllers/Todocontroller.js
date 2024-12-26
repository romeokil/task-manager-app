const Todo=require('../models/Todo.js')
const jwt=require('jsonwebtoken')
const getalltodo=async(req,res)=>{
    const Posts=await Todo.find({});
    res.json(Posts);
}
const gettodobyid=async(req,res)=>{
    console.log("specific todo walaa")
    const {id}=req.params;
    const tododoc=await Todo.findById(id);
    console.log("Particular Post is sent")
    res.json(tododoc);
}   
const getalltodoforid=async(req,res)=>{
    const {id}=req.params;
    const alltodo=await Todo.find({author:id});
    if(!alltodo) return res.status(300).json("Sorry you don't have any task")
    else{
        return res.status(201).json(alltodo)
    }
}
const createtodo=async(req,res)=>{
    let {token}=req.cookies;
    let {title,description}=req.body;
    console.log(token);
    let decoded=jwt.verify(token,process.env.JWT_SECRET);
    console.log(decoded);
    console.log(decoded.username)
    const Posts=await Todo.create({
        title,
        description,
        author:decoded.id
    })
    res.status(201).json(Posts);
}

const updatetodo=async(req,res)=>{
    try{    
        const {token}=req.cookies;
        console.log("token",token);
        if(!token) return res.status(300).json("Sorry but you are not Signed In!!")
        const {id}=req.params;
        const {title,description}=req.body;
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const decodedid=decoded.id;
        const specifictodo=await Todo.findById(id);
        console.log(specifictodo);
        console.log(JSON.stringify(specifictodo?.author));
        console.log(JSON.stringify(decodedid));
        const isAuthor=JSON.stringify(specifictodo.author)===JSON.stringify(decodedid);
        if(!isAuthor){
            return res.status(404).json({"msg":"You are not a genuine Author"})
        }
        const updatedtodo=await specifictodo.updateOne({
            title,
            description
        })
        res.json({"Update todo done!!":updatedtodo});
    }
    catch(error){
        console.log("Error in updating todo",error);
        res.status(500).json("Error while updating todo")
    }

}

const deletetodo=async(req,res)=>{
    try{
        const {id}=req.params;
        const {token}=req.cookies;
        if(!token) return res.status(300).json("Sorry but you need to sign in first!!")
        let decoded=jwt.verify(token,process.env.JWT_SECRET);
        const postdoc=await Todo.findById(id);
        const isAuthor=JSON.stringify(decoded.id)==JSON.stringify(postdoc.author);
        if(!isAuthor) return res.status(404).json("Sorry you are not the author");
        else{
            const deletedtodo=await Todo.findByIdAndDelete(id);
            if(!deletedtodo){
                res.status(404).json({"msg":"This is entry is not there"})
            }
            res.status(201).json({"msg":"Deleted Successfully!!"})
        }
    }
    catch(error){
        console.log("bhai delete ni kr skte hai todo ko");
        res.status(500).json("Error while deleteing todo")
    }
    
}

module.exports={
    getalltodo,
    gettodobyid,
    getalltodoforid,
    createtodo,
    updatetodo,
    deletetodo
}
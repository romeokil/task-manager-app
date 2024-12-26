const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cookieParser=require('cookie-parser')
const Authroutes=require('./routes/Authroutes.js')
const Todoroutes=require('./routes/Todoroute.js')
const cors=require('cors');
const path=require("path");
const dotenv=require('dotenv');
dotenv.config();
const PORT=process.env.PORT || 5000;
const cur_dirname=path.resolve();
app.use(cors({credentials:true,origin:'https://mern-todo-wmhj.onrender.com'}))
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',Authroutes);
app.use('/api/todo',Todoroutes);
app.use(express.static(path.join(cur_dirname,"/frontend/dist")));
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(cur_dirname,"frontend","dist","index.html"));
})

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
})
try{
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Database connected Successfully!")
})
}
catch(error){
    console.log("Database didn't connected!!!");
    console.log("Error: ",error);
}

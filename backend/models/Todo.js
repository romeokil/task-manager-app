const mongoose=require("mongoose");
const {Schema}= mongoose;
const TodoSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    author:{type:Schema.Types.ObjectId,ref:'User'}
},{
    timestamps:true 
}
)

const Todo=mongoose.model("Todo",TodoSchema);

module.exports=Todo;
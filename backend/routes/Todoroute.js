const express=require("express");
const {getalltodo,createtodo,updatetodo,deletetodo,gettodobyid,getalltodoforid} = require('../controllers/Todocontroller.js')
const router=express.Router();

router.get('/getalltodo',getalltodo);
router.get('/gettodo/:id',gettodobyid);
router.get('/getalltodoforid/:id',getalltodoforid);
router.post('/createtodo',createtodo);
router.put('/updatetodo/:id',updatetodo);
router.delete('/deletetodo/:id',deletetodo);

module.exports=router;
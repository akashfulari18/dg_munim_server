const express = require('express')
const bcrypt  = require('bcryptjs')
const jwt = require('jsonwebtoken')

const AdminModel = require('../model/AdminModel')
const UserModel = require('../model/user.model')
const authMiddleware = require('../middleware/auth.middleware')
const { checkRole } = require('../middleware/checkRole.middleware')
const FromKharidiModel = require('../model/fromKharidi.model')
const FromShetkariModel = require('../model/fromShetkari.model')
const MarketModel = require('../model/market.model')
const { generatePassword } = require('../utils')

const AdminRoute = express.Router()

AdminRoute.post("/signup",async(req,res)=>{
   const {email,password,role} = req.body
   console.log(req.body)

    try {
        
        const user = await AdminModel.find({email})

        if(user.length>0){
            res.status(400).send({err:"user already exists"})

        }else{

            const hashedPass = await bcrypt.hash(password,6)
            // console.log(hashedPass)
            
            const newUser =  new AdminModel({...req.body,password:hashedPass})
            await newUser.save()
            res.status(200).send({newUser})
        }

    } catch (error) {
        
        res.status(400).send({err:error.message})
    }
})

AdminRoute.post("/add_user",authMiddleware,checkRole(['admin']),async(req,res)=>{

    const {role,email,password,username} = req.body

    const {plainPassword, hashedPassword} = await generatePassword(username)
//    console.log(plainPassword,hashedPassword)
    try {  
            const user = await UserModel.find({email})

            if(user.length>0){
                res.status(400).send({err:"user already exists"})
            }else{
                const hashedPass = await bcrypt.hash(password,6)
                // console.log(hashedPass)
                
                const newUser =  new UserModel({...req.body,password:hashedPass})
                // await newUser.save()
                res.status(200).send({msg:"user added successfully..."})

            }
        
    } catch (error) {
        res.status(404).send({err:error.message})
        
    }
})

AdminRoute.get("/get_all_users",authMiddleware,checkRole(['admin']),async(req,res)=>{
//    console.log(req.role)
    try {
        
        const users = await UserModel.find()

        
        res.status(200).send(users)

    } catch (error) {
        res.status(400).send({err: error.message})
    }
    
})
AdminRoute.get("/get_single_user/:id",authMiddleware,checkRole(['admin']),async(req,res)=>{
    const {id} = req.params
    const role = req.query.role

    // console.log(role)
    try {
        
       

            const user = await UserModel.find({_id:id})
            if(user.length>0){

                res.status(200).send(user)
            }else{
                // console.log("inside else")
                res.status(400).send({err:"user not found"})
            }
       

      


    } catch (error) {
        res.status(400).send({err: error.message})
    }
})
AdminRoute.patch("/update_user/:id", authMiddleware, checkRole(['admin']), async (req, res) => {
    const { id } = req.params; // Extract the ID from params as a string
    
  
    try {
      const user = await UserModel.findByIdAndUpdate(id, req.body); // Use id as a string directly
  
      if (!user) {
        // const updated_user = await UserModel.find({ _id: id }); // Use id as a string directly
           res.status(400).send("No such user exists.");
    } else {
           res.status(200).send("user Updated Successful");
      }
    } catch (error) {
      res.status(400).send({ err: error.message });
    }
  });
  

AdminRoute.delete("/inactive_user/:id",authMiddleware,checkRole(['admin']),async(req,res)=>{
    const {id} = req.params
    // const role = req.query.role
     
    // console.log(role)
    try {
         const user =await UserModel.findByIdAndDelete({_id:id})

         if(!user){
             res.status(400).send("user not found")

         }else{

             res.status(200).send("user deleted...",user)
         }
         

 } catch (error) {
     res.status(400).send({err: error.message})
 }
})

AdminRoute.post('/add_market_details',authMiddleware,checkRole(['admin']),async(req,res)=>{
    const {email} = req.body
    // console.log(email)
    try {

        const user = await MarketModel.find({email})
        console.log(user)
        if(user.length>0){
            res.status(400).send({err:"market already exists"})

        }else{
            const kharidiDetails =await new MarketModel(req.body)
             
            await kharidiDetails.save()
    
            res.status(200).send({msg:"market updated successfully..."})
        }
        
    } catch (error) {
        res.status(400).send({err:error.message})
        
    }
})

AdminRoute.put('/update_shetkari_details',authMiddleware,checkRole(['admin']),async(req,res)=>{
    const id = "64f5ba430012de0737db9e0d"
    try {
        const kharidiDetails =await FromShetkariModel.findByIdAndUpdate(id,req.body)
        
        if(!kharidiDetails){
            res.status(400).send({err:"wrong process..."})

        }else{

            res.status(200).send({msg:"shetkari updated successfully..."})
        }

        
    } catch (error) {
        res.status(400).send({err:error.message})
        
    }
})

AdminRoute.put('/update_kharidi_details',authMiddleware,checkRole(['admin']),async(req,res)=>{
    const id="64f5b4c86bfec3a18fab8eb2"
    try {
        const shetkariDetails =await FromShetkariModel.findByIdAndUpdate(id,req.body)
        
        // const updatedKharidi = await kharidiDetails.save()

        if(!shetkariDetails){
            res.status(400).send({err:"wrong process..."})

        }else{

            res.status(200).send({msg:"shetkari updated successfully..."})
        }
        
    } catch (error) {
        res.status(400).send({err:error.message})
        
    }
})


module.exports=AdminRoute
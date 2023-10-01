const { hashPassword, comparePassword } = require("../helpers/authHelper")
const userModels = require("../models/userModels")
const orderModel = require("../models/orderModel")
const JWT = require("jsonwebtoken")

const registerController = async(req,res)=>{
    try {
        const {name,email,password,phone,address,answer} = req.body
        // validation
        if(!name){
            return res.send({message:"Name is Required"})
        }
        if(!email){
            return res.send({message:"Email is Required"})
        }
        if(!password){
            return res.send({message:"Password is Required"})
        }
        if(!phone){
            return res.send({message:"Phone num is Required"})
        }
        if(!address){
            return res.send({message:"Address is Required"})
        }
        if(!answer){
            return res.send({message:"Answer is Required"})
        }
        

        // check user
        const existingUser = await userModels.findOne({email})
        // existing user
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:"Already Register Please Login"
            })
        }
        // Register user
        const hashedPassword= await hashPassword(password)
        // save
        const user = await new userModels({name,email,password:hashedPassword,phone,address,answer}).save()
        res.status(201).send({
            success:true,
            message:"User Register Successfully",
            user
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Registeration",
            error
        })
    }
}

// Login

const loginController = async (req,res)=>{
    try {
        const {email,password}=req.body
        // validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"Invalid email or password"
            })
        }
        // check user
        const user =await userModels.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email not exist"
            })
        }
        const match = await comparePassword(password,user.password)
        if (!match){
            return res.status(200).send({
                success:false,
                message:"Invalid Password"
            })
        }
        // Token
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"100d"})
        res.status(200).send({
            success:true,
            message:"Login Successfully",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role,
            },
            token,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Login",
            error
        })
    }
}
// Forgot Password

const forgotPasswordController = async(req,res)=>{
    try {
        const {email,answer, newPassword} = req.body
        if(!email){
            res.status(400).send({message:"Email is Required"})
        }
        if(!answer){
            res.status(400).send({message:"Answer is Required"})
        }
        if(!newPassword){
            res.status(400).send({message:"New Password is Required"})
        }
        // Check 
        const user = await userModels.findOne({email,answer})
        // Validation
        if(!user){
            return res.status(404).send({
                    success:false,
                    message:"Wrong Email Or Answer"
            })
        }
        const hashed = await hashPassword(newPassword)
        await userModels.findByIdAndUpdate(user._id,{password:hashed})
        res.status(200).send({
            success: true,
            message:"Password Reset Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went Wrong",
            error
        })
    }
}

// Test Controller
const testController = (req,res)=>{
    res.send("Protected Route");
}

// Update Profile
const updateprofileController = async (req, res)=>{
    try {
        const {name,email,password,address,phone} = req.body
        const user = await userModels.findById(req.user._id)
        // password
        if(password && password.length < 6){
            return res.json({error:"Password in required and must be 6 characters long"})
        }
        const hashedPassword = password ? await hashPassword(password) : undefined
        const updatedUser= await userModels.findByIdAndUpdate(req.user._id,{
            name: name || user.name,
            password: hashedPassword|| user.password,
            phone: phone || user.phone,
            address: address || user.address,
        },{new:true})
        res.status(200).send({
            success:true,
            message: "Profile Updated Successfully",
            updatedUser
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error While Updating Profile",
            error
        })
        
    }
}
// Order Controller

const getOrdersController = async (req,res) =>{
    try {
       const orders = await orderModel.find({buyer:req.user._id}).populate("products","-photo").populate("buyer","name") 
       res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error While Getting Orders"
        })
        
    }
}

//All Order Controller

const getAllOrdersController = async (req,res) =>{
    try {
       const orders = await orderModel.find({}).populate("products","-photo").populate("buyer","name").sort({createdAt: "-1"})
       res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error While Getting Orders"
        })
        
    }
}

// order status

const orderStatusController = async (req,res)=>{
    try {
        const { orderId } = req.params
        const { status } = req.body
        const orders = await orderModel.findByIdAndUpdate(orderId, {status}, {new:true})
        res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error While Updating Order",
            error,
        })
        
    }
}

module.exports = {registerController,loginController,testController,forgotPasswordController,updateprofileController,getOrdersController,getAllOrdersController,orderStatusController};
const User=require("../models/user")
const { v4 : uuidv4 }= require('uuid')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

const {setUser}=require('../service/auth')

async function handleUserSignup(req,res){
   const {name,email,password}=req.body;
   
   // Input validation
   if (!name || !email || !password) {
       return res.render("signup", {
           error: "All fields are required"
       });
   }
   
   if (password.length < 6) {
       return res.render("signup", {
           error: "Password must be at least 6 characters long"
       });
   }
   
   try {
       // Check if user already exists
       const existingUser = await User.findOne({ email });
       if (existingUser) {
           return res.render("signup", {
               error: "User already exists"
           });
       }
       
       // Hash password
       const hashedPassword = await bcrypt.hash(password, 10);
       
       await User.create({
           name,
           email,
           password: hashedPassword
       });
       return res.redirect("/");
   } catch (error) {
       return res.render("signup", {
           error: "Error creating user"
       });
   }
}

async function handleUserLogin(req,res){
    const {email,password}=req.body;
    
    // Input validation
    if (!email || !password) {
        return res.render("login", {
            error: "Email and password are required"
        });
    }
    
    try {
        const user=await User.findOne({email});
        if(!user){
            return res.render("login",{
                error:"Invalid email or password"
            })
        }
        
        // Compare password with hash
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.render("login",{
                error:"Invalid email or password"
            })
        }
         
        const token=setUser(user)
        res.cookie("uid", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        })
        return res.redirect("/");
    } catch (error) {
        return res.render("login", {
            error: "Login error"
        });
    }
}

module.exports={
    handleUserSignup,
    handleUserLogin
}


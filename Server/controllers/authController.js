const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcrypt');

const userRegister = async(req, res) => {
    try{
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(400).send('All fields are required');
        }
        const userExist = await userModel.findOne({email});
        if(userExist){
            return res.status(400).send('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();
        const token = await generateToken(newUser);
        res.cookie('token', token, {httpOnly: true, secure: true, sameSite: 'Strict'});
        res.status(201).send({message: 'User registered successfully', newUser, token});
    }catch(error){
        console.error(error.message);
        res.status(500).send('Server error');
    }
}

const userLogin = async(req,res)=>{
    try{
        const {email,password} =req.body;
        if(!email || !password){
            return res.status(400).send('All fields are required');
        }
        const userExist= await userModel.findOne({email});
        if(!userExist){
            return res.status(400).send('Email or password is incorrect');
        }
        const isPasswordMatch = await bcrypt.compare(password,userExist.password);
        if(!isPasswordMatch){
            return res.status(400).send('Email or password is incorrect');
        }
        const token = await generateToken(userExist);
        res.cookie('token', token, {httpOnly: true, secure: true, sameSite: 'Strict'});
        res.status(200).send({message: 'User logged in successfully', userExist, token});
    }catch(err){
        res.status(500).send('Server error');
    }
}
const userProfile = async(req,res)=>{
    try{
        const user = req.user;
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        return res.status(200).json({user});
    }catch(err){
        console.log(err.message);
        return res.status(500).json({message: 'Internal server error'});
    }
}

module.exports = {userRegister, userLogin,userProfile};
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS, SECRET_KEY } = require('../config');
const saltRounds = Number(SALT_ROUNDS);

//admin authentication

exports.adminRegister = async (req, res, next) => {
    try{
        const { name, email, password } = req.body;
        if(!name || !email || !password) return res.status(400).json({message:'All inputs are required'});
        const admin = await Admin.findOne({email});
        if(admin) return res.status(400).json({message:'Admin already exists'});
        const encryptedPassword = await bcrypt.hash(password, saltRounds);
        const newAdmin = await Admin.create({name, email, password: encryptedPassword});
        const token = jwt.sign({_id: newAdmin._id, email, role: newAdmin.role}, SECRET_KEY, {expiresIn:'1d'});
        await newAdmin.addToken(token);
        res.status(201).json({message:'Admin created successfully', access_token: token});
    }catch(error){
        next(error);
    }
}

exports.adminLogin = async (req, res, next) => {
    try{
        const { email, password } = req.body;
        if(!email || !password) return res.status(400).json({message:'All inputs are required'});
        const admin = await Admin.findOne({email});
        if(!admin) return res.status(400).json({message:'Admin does not exist'});
        const validPassword = await bcrypt.compare(password, admin.password);
        if(!validPassword) return res.status(400).json({message:'Invalid password'});
        const token = jwt.sign({_id: admin._id, email, role: admin.role}, SECRET_KEY, {expiresIn:'1d'});
        await admin.addToken(token);
        res.status(200).json({message:'Admin logged in successfully', access_token: token});
    }catch(error){
        next(error)
    }
}


//user authentication

exports.userRegister = async (req, res, next) => {
    try{
        const { name, email, password } = req.body;
        if(!name || !email || !password) return res.status(400).json({message:'All inputs are required'});
        const user = await User.findOne({email});
        if(user) return res.status(400).json({message:'User already exists'});
        const encryptedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await User.create({name, email, password: encryptedPassword});
        if(!newUser) return res.status(400).json({message:'User could not be created'});
        const token = jwt.sign({_id: newUser._id, name, email, role: newUser.role}, SECRET_KEY, {expiresIn:'1d'});
        await newUser.addToken(token);
        return res.status(201).json({message:'User created successfully', access_token: token});
    }catch(error){
        next(error);
    }
}

exports.userLogin = async (req, res, next) => {
    try{
        const { email, password } = req.body;
        if(!email || !password) return res.status(400).json({message:'All inputs are required'});
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message:'User does not exist'});
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) return res.status(400).json({message:'Invalid password'});
        const token = jwt.sign({_id: user._id, name: user.name, email, role: user.role}, SECRET_KEY, {expiresIn:'1d'});
        await user.addToken(token);
        return res.cookie("access_token", token, {httpOnly:true, secure:false}).status(200).json({message:'User logged in successfully', access_token: token});
    }catch(error){
        next(error);
    }
}
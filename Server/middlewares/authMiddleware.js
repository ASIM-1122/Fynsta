const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');


const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message: 'No token, authorization denied'});
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message: 'Token is not valid'});
        };
        const existUser = await userModel.findById(decoded.id).select('-password');
        if(!existUser){
            return res.status(401).json({message: 'User does not exist'});
        }
        req.user = existUser;
        next();
    }catch(err){
        console.log(err.message);
        res.status(401).json({message: 'Internal server error'});
    }
}

module.exports = authMiddleware;
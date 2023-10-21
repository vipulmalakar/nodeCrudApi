const User = require('../models/user');

exports.getUsers = async (req, res, next) => {
    try{
        const users = await User.find({}).select('-password -tokens');
        return res.status(200).json({ message: 'Users fetched successfully', users });
    } catch(error) {
        next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    try{
        const { userId } = req.body;
        const user = await User.findByIdAndDelete(userId);
        if(!user) return res.status(400).json({message:'User does not exist'});
        return res.status(200).json({message:'User deleted successfully'});
    } catch(error){
        next(error);
    }
};
const User = require('../models/user');

exports.getUserDetails = async (req, res, next) => {
    try{
        const userId = req.user._id;
        const user = await User.findById(userId).select('-password -tokens');
        res.status(200).json({ message: 'User details retrieved successfully', user });
    } catch(error){
        next(error);
    }
};

exports.updateUserDetails = async (req, res, next) => {
    try{
        const userId = req.user._id;
        const { name } = req.body;
        if(!name) return res.status(400).json({ message: 'Name is required' });
        const user = await User.findByIdAndUpdate(userId, { name }, { new: true }).select('-password -tokens');
        res.status(200).json({ message: 'User details updated successfully', user });
    } catch(error){
        next(error);
    }
};
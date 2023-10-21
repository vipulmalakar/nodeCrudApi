require('dotenv').config();
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const Admin = require('../models/admin');
const User = require('../models/user');

async function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).send('Authorization denied: Token needed');
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    if (!decoded) return res.status(401).send('Invalid Token');
    const { _id, role } = decoded;
    if(!_id || !role) return res.status(401).send('Invalid Token');
    if(role === 'admin') {
      const admin = await Admin.findById(_id);
      if(!admin) return res.status(404).send('Admin not exits');
      if(!admin.tokens.includes(token)) res.status(401).send('Invalid Token');
      req.user = decoded;
      next();
    } else if(role === 'user') {
      const user = await User.findById(_id);
      if(!user) return res.status(404).send('User not exits');
      if(!user.tokens.includes(token)) res.status(401).send('Invalid Token');
      req.user = decoded;
      next();
    }else return res.status(401).send('Invalid Token');
  } catch (err) {
    if(err.name === 'TokenExpiredError') return res.status(401).send('Token expired');
    next(err);
  }
};

function authorize(roles) {
  return (req, res, next) => {
    try{
      const userRole = req.user.role;
      if (!roles.includes(userRole)) throw new Error('Access denied');
      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = { authenticate, authorize };
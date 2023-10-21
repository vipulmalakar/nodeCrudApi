const express = require("express");
const { userRegister, userLogin, adminRegister, adminLogin } = require("../controller/auth.controller");
const router = express.Router();

router.post('/userRegister', userRegister);

router.post('/userLogin', userLogin);

router.post('/adminRegister', adminRegister);

router.post('/adminLogin', adminLogin);

// Logout route
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;

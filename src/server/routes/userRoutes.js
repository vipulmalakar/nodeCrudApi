const express = require("express");
const { updateUserDetails, getUserDetails } = require("../controller/userController");
const router = express.Router();

router.get('/getUserDetails', getUserDetails);

router.patch('/updateUserDetails', updateUserDetails);

module.exports = router;

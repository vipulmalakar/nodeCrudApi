const express = require("express");
const router = express.Router();
const { deleteUser, getUsers } = require("../controller/adminController");

router.get('/getUsers', getUsers);

router.delete('/deleteUser', deleteUser);

module.exports = router;

const express = require('express');
const {createUser, getAllUsers, getUserById, deleteUser, updateUser} = require('../controller/userController');

const router = express.Router();

router.post('/createUser', createUser);
router.get('/getAllUsers', getAllUsers);
router.get('/getUserById/:userId', getUserById);
router.delete('/deleteUser/:userId', deleteUser);
router.put('/updateUser/:userId', updateUser);

module.exports = router
const express=require('express');

const {signup,login} = require('../controllers/auth.js');
//CONTROLLER/AUTH HAS ALL THE REAL WORKING BACKEND OF AUTHORIZATION

const router= express.Router();

router.post('/signup',signup);
router.post('/login',login);

module.exports = router;    //TO EXPORT OUR ROUTER
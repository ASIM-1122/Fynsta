const express = require('express');
const router = express.Router();
const { userRegister,userLogin, userProfile } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/',(req,res)=>{
    res.send('User route is working');
});
router.post('/register', userRegister);
router.post('/login', userLogin);

router.get('/userProfile',authMiddleware,userProfile)

module.exports = router;

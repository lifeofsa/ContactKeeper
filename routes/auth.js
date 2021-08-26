const express = require('express')

const router = express.Router()

// @route   GET/api/auth
// @desc    Get logged in user
// @acc     Private
router.get('/' , (req, res)=> {
    res.send('Get Logged in user')
})


// @route   POST/api/auth
// @desc    Auth User & get Token
// @acc     Public
router.post('/' , (req , res)=> {
    res.send('Login a user')
})

module.exports = router
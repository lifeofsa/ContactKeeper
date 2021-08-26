const express = require('express')

const router = express.Router()

// @route   POST/api/users
// @desc    Created a User
// @acc     Public

router.post('/' , (req, res)=> res.send('Registered a user') )

module.exports = router
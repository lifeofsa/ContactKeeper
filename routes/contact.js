const express = require('express')

const router = express.Router()

// @route   GET/api/contact
// @desc    GET all user contacts   
// @acc     Private
router.get('/' , (req , res) => {
    res.send('Get All Contacts')
})



// @route   POST/api/contact
// @desc    Add new contact
// @acc     Private
router.post('/' , (req , res) => {
    res.send('Add Contacts')
})

// @route   PUT/api/contact/:id
// @desc    Update a contact
// @acc     Private
router.put('/:id' , (req , res) => {
    res.send('Update Contacts')
})

// @route   DELETE/api/contact/:id
// @desc    Update a contact
// @acc     Private
router.delete('/:id' , (req , res) => {
    res.send('Delete Contacts')
})




module.exports = router
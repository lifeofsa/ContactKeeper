const express = require('express');

const auth = require('../middleware/auth');
const User = require('../models/User');
const Contact = require('../models/Contact');

const { check, validationResult } = require('express-validator');

const router = express.Router();

// @route   GET/api/contact
// @desc    GET all user contacts
// @acc     Private
router.get('/', auth, async (req, res) => {
  try {
    const contact = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contact);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Problem');
  }
});

// @route   POST/api/contact
// @desc    Add new contact
// @acc     Private
router.post(
  '/',
  [auth, [check('name', 'Please type name here').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    const { name, email, phone, type, location } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        location,
        user: req.user.id,
      });
      const addContact = await newContact.save();
      res.json(addContact);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server Problem');
    }
  },
);

// @route   PUT/api/contact/:id
// @desc    Update a contact
// @acc     Private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type, location } = req.body;
  // Build an Object
  const setContact = {};
  if (name) setContact.name = name;
  if (email) setContact.email = email;
  if (phone) setContact.phone = phone;
  if (type) setContact.type = type;
  if (location) setContact.location = location;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: 'Contact not Found' });

    // User dont mess with another user contacts
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'you have not acces to that' });
    }
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: setContact },
      { new: true },
    );

    res.json(contact);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Problem' });
  }
});

// @route   DELETE/api/contact/:id
// @desc    Update a contact
// @acc     Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    // to making sure that a contact cannot be removed by other user
    if (contact.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'you do not have access to this account' });
    }

    // Removing Contact
    await Contact.findByIdAndRemove(req.params.id);
    res.json('Contact Removed');
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Problem' });
  }
});
module.exports = router;

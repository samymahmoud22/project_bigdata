const express = require('express');
const router = express.Router();

const User = require('../models/mydataschema');


// GET صفحة إضافة مستخدم
router.get('/add', (req, res) => {
  res.render('add-user');
});

// POST Route لإضافة مستخدم
router.post('/add', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const newUser = new User({ name, email, phone });
    await newUser.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.send('Error: ' + err.message);
  }
});

// GET جميع المستخدمين مع إمكانية البحث
router.get('/', async (req, res) => {
  try {
    const searchQuery = req.query.search || '';
    const users = await User.find({
      name: { $regex: searchQuery, $options: 'i' } // البحث عن الاسم 
    });
    res.render('users', { users, searchQuery });
  } catch (err) {
    console.error(err);
    res.send('Error: ' + err.message);
  }
});

// GET صفحة تعديل مستخدم
router.get('/edit/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render('edit-user', { user });
  } catch (err) {
    console.error(err);
    res.send('Error: ' + err.message);
  }
});



module.exports = router;

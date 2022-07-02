const express = require('express')
const router = express.Router()

// import Model
const db = require('../../models')
const User = db.User
const Todo = db.Todo

// routers for register
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.create({ name, email, password })
    .then(user => res.redirect('/'))
})

// routers for login
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  res.send('login')
})

// router for logout
router.get('/logout', (req, res) => {
  res.send('logout')
})

module.exports = router
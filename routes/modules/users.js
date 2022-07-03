const express = require('express')
const router = express.Router()

// import Model
const db = require('../../models')
const User = db.User
const Todo = db.Todo

// import passport & bcrypt
const passport = require('passport')
const bcrypt = require('bcryptjs')

// routers for register
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: 'All fields are required!' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: 'Password and Confirm Password do not match!' })
  }
  if (errors.length) {
    return res.render('register', { errors, name, email, password, confirmPassword })
  }

  User.findOne({ where: { email } })
    .then(user => {
      if (user) {
        console.log('User already exists')
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      }
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
})

// routers for login
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRredirect: '/users/login'
}))

// router for logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/users/login')
  })
})

module.exports = router
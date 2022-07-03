const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')

const routes = require('./routes')

const usePassport = require('./config/passport')

const app = express()
const PORT = 3000

// import Model
const db = require('./models')
const User = db.User
const Todo = db.Todo

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.set('views', './views')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)

// middleware
qpp.use((req, res, next) => {
  res.locals.isAuthenticated= req.isAuthenticated()
  res.locals.user = req.user

  next()
})

app.use(routes)
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
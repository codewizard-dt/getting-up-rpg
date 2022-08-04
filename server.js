const express = require('express')
const path = require('path')

const exphbs = require('express-handlebars')
const session = require('express-session')
// const sequelize = require('./config/connection')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const app = express()
const PORT = process.env || 3001

const sess = {
  secret: process.env.SECRET || 'GET UP!',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  },
  resave: false,
  saveUninitialized: false,
  // store: new SequelizeStore({
  //   db: sequelize
  // })
}

app.use(session(sess))

const hbs = exphbs.create()

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

// app.use(routes)

// sequelize.sync({ force: false }).then(() => {
app.listen(PORT, () =>
  console.log(
    `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`
  )
);
// });

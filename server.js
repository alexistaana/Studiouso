const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()
const morgan = require('morgan')
const passport = require('passport')

const { router: usersRouter } = require('./users')
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth')
// const { router: endpointRouter } = require('./endpoint')

mongoose.Promise = global.Promise

const { PORT, DATABASE_URL } = require('./config')

const app = express()

app.use(express.static('public'))

app.use(morgan('common'))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
  if (req.method === 'OPTIONS') {
    return res.send(204)
  }
  next()
})

passport.use(localStrategy)
passport.use(jwtStrategy)

app.use('/api/users/', usersRouter)
app.use('/api/auth/', authRouter)
// app.use('/app/', endpointRouter)

const jwtAuth = passport.authenticate('jwt', { session: false })

// app.get('/auth', jwtAuth, (req, res) =>{
//   //CREATES NEW AUTH TOKEN
// })

app.get('/checkAuth', jwtAuth, (req, res) => {
  // res.redirect('/dashboard')
  // CHECKS JWT TOKEN
  res.send('Success!!')
})

app.get('/about', function (req, res) {
  res.sendFile(`${__dirname}/public/about.html`)
})

app.get('/contact', function (req, res) {
  res.sendFile(`${__dirname}/public/contact.html`)
})

app.get('/', function (req, res) {
  res.sendFile('${__dirname}/public/index.html')
})

app.get('/dashboard', function (req, res) {
  res.sendFile(`${__dirname}/public/dashboard.html`)
})

app.get('/authenticated/dashboard', (req, res) => {
  res.sendFile(`${__dirname}/public/dashboard.html`)
})

app.get('/authenticated/contact', (req, res) => {
  res.sendFile(`${__dirname}/public/authenticated/contact.html`)
})

app.get('/authenticated/about', (req, res) => {
  res.sendFile(`${__dirname}/public/authenticated/about.html`)
})

app.get('/authenticated/foodcalc', (req, res) => {
  res.sendFile(`${__dirname}/public/authenticated/foodcalc.html`)
})

let server

function runServer () {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, err => {
      if (err) {
        return reject(err)
      }
      server = app
        .listen(PORT, () => {
          console.log(`Your app is listening on port ${PORT}`)
          resolve()
        })
        .on('error', err => {
          mongoose.disconnect()
          reject(err)
        })
    })
  })
}

function closeServer () {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server')
      server.close(err => {
        if (err) {
          return reject(err)
        }
        resolve()
      })
    })
  })
}

if (require.main === module) {
  runServer().catch(err => console.error(err))
}

module.exports = { app, runServer, closeServer}

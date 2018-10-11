const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()
const morgan = require('morgan')
const passport = require('passport')

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const { router: usersRouter, User } = require('./users')
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth')

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

const jwtAuth = passport.authenticate('jwt', { session: false })

app.get('/checkAuth', jwtAuth, (req, res) => {
  // CHECKS JWT TOKEN
  res.status(200).end()
})

//ABOUT PAGE
app.get('/about', function (req, res) {
  res.sendFile(`${__dirname}/public/about.html`)
})

//CONTACT PAGE
app.get('/contact', function (req, res) {
  res.sendFile(`${__dirname}/public/contact.html`)
})

//LOGIN PAGE PAGE
app.get('/', function (req, res) {
  res.sendFile('${__dirname}/public/index.html')
})

//DASHBOARD PAGE
app.get('/dashboard', function (req, res) {
  res.sendFile(`${__dirname}/public/dashboard.html`)
})

//DASHBOARD PAGE
app.get('/authenticated/dashboard', (req, res) => {
  res.sendFile(`${__dirname}/public/dashboard.html`)
})

//AUTHENTICATED CONTACT PAGE
app.get('/authenticated/contact', (req, res) => {
  res.sendFile(`${__dirname}/public/authenticated/contact.html`)
})

//AUTHENTICATED ABOUT PAGE
app.get('/authenticated/about', (req, res) => {
  res.sendFile(`${__dirname}/public/authenticated/about.html`)
})

//FOOD CALCULATOR PAGE
app.get('/authenticated/foodcalc', (req, res) => {
  res.sendFile(`${__dirname}/public/authenticated/foodcalc.html`)
})

//TASK EDITOR PAGE
app.get('/authenticated/taskeditor', (req, res) => {
  res.sendFile(`${__dirname}/public/authenticated/task.html`)
})

//SCHEDULE EDITOR PAGE
app.get('/authenticated/schedule', (req, res) => {
  res.sendFile(`${__dirname}/public/authenticated/schedule.html`)
})

//POST REQUEST TO STORE BMR RESULTS
app.put('/post/bmr', jsonParser, (req, res) => {

  User.findByIdAndUpdate(req.body.id, { bmrResults: req.body.bmrResults })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(400).end()
    })

})

//POST REQUEST TO STORE BMI RESULTS
app.put('/post/bmi', jsonParser, (req, res) => {
  User.findByIdAndUpdate(req.body.id, { bmiResults: req.body.bmiResults })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(400).end()
    })
})

//PUT REQUEST TO STORE TASKS
app.put('/post/task', jsonParser, (req, res) => {
  User.findByIdAndUpdate(req.body.id,
    {
      $push: {
        "tasks": {
          description: req.body.description,
          date: req.body.date
        }
      }
    })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(400).end();
    })
})

//POST REQUEST TO STORE TASKS
app.put('/post/schedule', jsonParser, (req, res) => {

  User.findByIdAndUpdate(req.body.id,
    {
      $push: {
        "schedule": {
          description: req.body.description,
          date: req.body.date
        }
      }
    })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(400).end();
    })
})

app.put('/put/schedule', jsonParser, (req, res) => {
  User.updateOne(
    { _id: req.body.id, "schedule.date": req.body.date },
    { $set: { "schedule.$.description": req.body.description } }
  )
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(400).end();
    })
})

app.delete('/delete/schedule', jsonParser, (req, res) => {
  User.updateOne(
    { _id: req.body.id, "schedule.date": req.body.date },
    { $pull: { schedule: {date: req.body.date} } } 
  )
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(400).end();
    })
})

let server

//RUN SERVER
function runServer() {
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

//CLOSE SERVER
function closeServer() {
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

module.exports = { app, runServer, closeServer }

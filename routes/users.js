const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const router = require('express').Router()

const { validators } = require('../lib/validators')
const { User } = require('../models/User')
const { Pup } = require('../models/Pup')
const JWT_SECRET = process.env.JWT_SECRET

// @route POST api/users/register
// @desc Register new user
// @access Public
router.post('/register', (req, res) => {
  const { email, password, password2 } = req.body
  const { errors, isValid } = validators.registerInput({
    email,
    password,
    password2
  })
  if (!isValid) {
    return res.status(400).json(errors)
  }
  User.findOne({ email }).then(user => {
    if (user) {
      errors.email = 'Email already exists'
      return res.status(400).json(errors)
    } else {
      const newUser = new User({
        email,
        password
      })
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then(user => {
              const returnedUser = {
                _id: user._id,
                email: user.email
              }
              res.json(returnedUser)
            })
            .catch(err => console.log(err))
        })
      })
    }
  })
})

// @route POST api/users/login
// @desc Log user in
// @access Public
router.post('/login', (req, res) => {
  const { email, password } = req.body
  const { errors, isValid } = validators.loginInput({ email, password })

  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = 'User not found'
      return res.status(404).json(errors)
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id
        }
        jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
          if (!err) {
            res.json({
              success: true,
              token: `Bearer ${token}`
            })
          }
        })
      } else {
        errors.password = 'Password Incorrect'
        return res.status(400).json(errors)
      }
    })
  })
})

// @route GET api/users/current
// @desc Get current user
// @access Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let user = {
      id: req.user.id,
      email: req.user.email
    }
    res.json(user)
  }
)

// @route DELETE api/users
// @desc Delete user and their pups and poops
// @access Private
//router.delete(
//  '/',
//  passport.authenticate('jwt', { session: false }),
//  (req, res) => {
//    const user = req.user.id
//    Reminder.deleteMany({ user })
//      .then(() => {
//        User.findOneAndRemove({ _id: user }).then(() => {
//          res.json({ success: true })
//        })
//      })
//      .catch(e => res.status(400).json(e))
//  }
//)

module.exports = { router }

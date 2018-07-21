const passport = require('passport')
const router = require('express').Router()

const { validators } = require('../lib/validators')
const { User } = require('../models/User')
const { Pup } = require('../models/Pup')
const { Poop } = require('../models/Poop')

// @route POST api/pups/create
// @desc Create a Pup
// @access Private
router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { id: userId } = req.user
    const { errors, isValid } = validators.pupInput(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }
    Pup.findOne({ user: userId, name: req.body.name }).then(pup => {
      if (pup) {
        errors.pupname = "You've already got a pup with this name"
        return res.status(400).json(errors)
      } else {
        const newPup = new Pup({
          name: req.body.name,
          user: userId
        })
        newPup.save().then(pup => res.json(pup))
      }
    })
  }
)

// @route POST api/pups/edit
// @desc Edit a Pup
// @access Private
router.post(
  '/edit',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { id: userId } = req.user
    const { pupId, name } = req.body
    const { errors, isValid } = validators.pupInput({ name })
    if (!isValid) {
      return res.status(400).json(errors)
    }
    Pup.findOneAndUpdate({ _id: pupId }, { name }, { new: true })
      .then(pup => {
        res.json(pup)
      })
      .catch(e => res.status(400).json(e))
  }
)

// @route GET api/pups
// @desc Get all pups
// @access Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { id: userId } = req.user
    Pup.find({ user: userId })
      .then(pups => {
        res.json(pups)
      })
      .catch(e => res.status(400).json(e))
  }
)

// @route GET api/pups/:id
// @desc Get a pup by its id
// @access Private
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { id: userId } = req.user
    const pupId = req.params.id
    Pup.findById(pupId)
      .then(pup => {
        if (pup) {
          Poop.find({ pup: pupId })
            .sort({ time: -1 })
            .limit(30)
            .then(poops => {
              res.json(poops)
            })
            .catch(e => {
              res.json([])
            })
        } else {
          res.status(404).json({ notfound: 'Unable to find pup by id' })
        }
      })
      .catch(e => res.status(400).json({ error: e }))
  }
)

// @route DELETE api/pups/:id
// @desc Delete a pup by its id
// @access Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const pupId = req.params.id
    const { id: userId } = req.user
    Pup.findOne({ _id: pupId, user: userId }).then(pup => {
      pup
        .remove()
        .then(() => {
          Poop.deleteMany({ pup: pupId })
            .then(() => {
              res.json({ success: true })
            })
            .catch(e => {
              res.status(400).json({ error: e })
            })
        })
        .catch(e => res.status(400).json({ success: false }))
    })
  }
)

// @route GET api/pups/poops/:id
// @desc Get all poops for a pup
// @access Private
router.get(
  '/poops/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const pupId = req.params.id
    Poop.find({ pup: pupId })
      .then(poops => {
        res.json(poops)
      })
      .catch(e => res.status(400).json({ poopgeterror: e }))
  }
)

module.exports = { router }

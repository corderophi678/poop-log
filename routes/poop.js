const passport = require('passport')
const router = require('express').Router()

const { validators } = require('../lib/validators')
const { User } = require('../models/User')
const { Pup } = require('../models/Pup')
const { Poop } = require('../models/Poop')

// @route POST api/poops/create
// @desc Create a Poop for a pup
// @access Private
router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { didPoop, pupId, time, notes } = req.body
    let newPoop = new Poop({
      pup: pupId,
      didPoop,
      time,
      notes
    })
    newPoop
      .save()
      .then(poop => res.json({ create: true }))
      .catch(e => res.status(400).json({ poopsaveerror: e }))
  }
)

// @route POST api/poops/edit/:id
// @desc Edit a Poop
// @access Private
router.post(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const targetPoopId = req.params.id
    let { didPoop, time, notes } = req.body
    console.log('didPoop', didPoop)
    console.log('time', time)
    console.log('notes', notes)
    Poop.findOneAndUpdate(
      { _id: targetPoopId },
      { didPoop, time, notes },
      { new: true }
    )
      .then(poop => {
        res.json({ update: true })
      })
      .catch(e => res.status(400).json({ poopediterror: e }))
  }
)

// @route DELETE api/poops/:id
// @desc Delete poop by id
// @access Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const targetPoopId = req.params.id
    Poop.findByIdAndDelete(targetPoopId)
      .then(() => {
        res.json({ delete: true })
      })
      .catch(e => res.status(400).json({ poopdeleteerror: e }))
  }
)

// @route GET api/poops/:id
// @desc Get a single poop's info
// @access Private
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const targetPoopId = req.params.id
    Poop.findById(targetPoopId)
      .then(poop => res.json(poop))
      .catch(e => res.status(404).json({ poopnotfound: e }))
  }
)

// @route GET api/poops/all/:id
// @desc Get all of a pup's poops
// @access Private
router.get(
  '/all/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Poop.find({ pup: req.params.id })
      .then(poops => res.json(poops))
      .catch(e => res.status(404).json({ poopsnotfound: e }))
  }
)

module.exports = { router }

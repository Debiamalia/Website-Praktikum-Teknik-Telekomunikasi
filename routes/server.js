const express = require('express')
const router = express.Router()
const Ptt = require('../models/ptt')

router.get('/', async (req, res) => {
  let ptts
  try {
    ptts = await Ptt.find().sort().limit(10).exec()
  } catch {
    ptts = []
  }
  res.render('index', { ptts: ptts })
})

module.exports = router
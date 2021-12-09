const express = require('express')
const router = express.Router()
const Ptt = require('../models/ptt')

//Data ptt tahun ini
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.nama != null && req.query.nama !== "") {
        searchOptions.nama = new RegExp(req.query.nama, 'i')
    }
    try {
        const ptts = await Ptt.find(searchOptions)
        res.render('ptts/index', { 
            ptts: ptts, 
            searchOptions: req.query })
    } catch {
        res.redirect('/')
    }
})

//Data ptt tambahan
router.get('/new', (req, res) => {
    res.render('ptts/new', { ptt: new Ptt() })
})

//Create PTT Route
router.post('/', async (req, res) => {
    const ptt = new Ptt({
        nama: req.body.nama,
        nim: req.body.nim,
        praktikum: req.body.praktikum,
        nama_mata_kuliah_praktikum: req.body.nama_mata_kuliah_praktikum,
        modul: req.body.modul,
        hari_tanggal_praktikum : req.body.hari_tanggal_praktikum,
        jam_praktikum : req.body.jam_praktikum,
        nama_asisten: req.body.nama_asisten,
        nim_asisten: req.body.nim_asisten,
        kelompok : req.body.kelompok,
        online_offline :req.body.online_offline,
    })
    try {
        const newPtt = await ptt.save()
        //res.redirect('ptts/${newPtt.id}')
        res.redirect('ptts')
    } catch {
        res.render('ptts/new', {
            ptt: ptt,
            errorMessage: 'Error creating New PTT Data'
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
      const ptt = await Ptt.findById(req.params.id)
                             .exec()
      res.render('index', { ptt: ptt })
    } catch {
      res.redirect('/')
    }
})


router.get('/:id/edit', async (req, res) => {
    try {
      const ptt = await Ptt.findById(req.params.id)
      res.render('ptts/edit', { ptt: ptt })
    } catch {
      res.redirect('/ptts')
    }
  })
  
  router.put('/:id', async (req, res) => {
    let ptt
    try {
      ptt = await Ptt.findById(req.params.id)
      ptt.nama = req.body.nama
      ptt.nim = req.body.nim
      ptt.ptaktikum = req.body.praktikum
      ptt.nama_mata_kuliah_praktikum = req.body.nama_mata_kuliah_praktikum
      ptt.jam_praktikum = req.body.jam_praktikum
      ptt.nama_asisten = req.body.nama_asisten
      ptt.nim_asisten = req.body.nim_asisten
      ptt.kelompok = req.body.kelompok
      ptt.online_offline = req.body.online_offline
      await ptt.save()
      res.redirect(`/ptts/${ptt.id}`)
    } catch {
      if (ptt == null) {
        res.redirect('/')
      } else {
        res.render('ptts/edit', {
          author: author,
          errorMessage: 'Error updating Data Praktikum Terbaru'
        })
      }
    }
  })
  
  router.delete('/:id', async (req, res) => {
    let ptt
    try {
      ptt = await Ptt.findById(req.params.id)
      await ptt.remove()
      res.redirect('/ptts')
    } catch {
      if (ptt == null) {
        res.redirect('/')
      } else {
        res.redirect(`/ptts/${ptt.id}`)
      }
    }
})
module.exports = router
/*
router.get('/search', (request, response) => {
    console.log(request.query)
    if(request.query.q === ''){
        response.json([])
    }
    ptt.find({$or : [{"name" : {"$regex": request.query.q, "$options": "$i"}}, {"nim": {"$regex": request.query.q, "$options": "$i"}}]}).then(ptt => {
            if(ptt) response.json(ptt)
            else response.status(404).end()
        }
    ).catch(() => response.status(404).end()) 
    response.status(404).end()
})
*/
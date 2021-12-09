const mongoose = require('mongoose')

const pttSchema = new mongoose.Schema({
  nama: {type: String, requires: true},
  nim: {type: Number, required : true},
  praktikum: {type: String, required : true},
  nama_mata_kuliah_praktikum: {type: String, required : true},
  modul : {type: Number, required : true},
  hari_tanggal_praktikum : {type: String, required : true},
  jam_praktikum : {type: String, required : true},
  nama_asisten : {type: String, required : true},
  nim_asisten: {type: Number, required : true},
  kelompok : {type: Number, required : true},
  online_offline : {type: String, required : true}
})

module.exports = mongoose.model('Ptt', pttSchema)
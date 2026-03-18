const mongoose = require("mongoose")

const ConsultaSchema = new mongoose.Schema({
  paciente: String,
  data: String,
  hora: String,
  cep: String,
  endereco: String,
  clima: String
})

module.exports = mongoose.model("Consulta", ConsultaSchema)
const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String,
  tipo: {
    type: String,
    enum: ["paciente", "secretario"],
    default: "paciente"
  }
})

module.exports = mongoose.model("User", UserSchema)
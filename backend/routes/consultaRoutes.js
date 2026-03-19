const express = require("express")
const router = express.Router()

const {
  agendar,
  buscarCep,
  listar
} = require("../controllers/consultaController")


router.get("/", listar)
router.post("/", agendar)

router.get("/cep/:cep", buscarCep)

module.exports = router
const express = require("express")
const router = express.Router()

const { agendar, buscarCep, listar } = require("../controllers/consultaController")

router.post("/", agendar)
router.get("/", listar) 
router.get("/cep/:cep", buscarCep)

module.exports = router
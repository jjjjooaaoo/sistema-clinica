const express = require("express")
const router = express.Router()

const {
  agendar,
  buscarCep,
  listar
} = require("../controllers/consultaController")

const authMiddleware = require("../middlewares/auth") // <-- middleware JWT

// Rotas protegidas
router.get("/", authMiddleware, listar)  
router.post("/", authMiddleware, agendar) 

// Rota pública para buscar CEP
router.get("/cep/:cep", buscarCep)

module.exports = router
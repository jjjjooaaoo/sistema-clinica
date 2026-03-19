// backend/routes/consultaRoutes.js
const express = require("express")
const router = express.Router()

const { agendar, buscarCep, listar } = require("../controllers/consultaController")
const authMiddleware = require("../middlewares/auth") // 🔹 Middleware JWT

// Rotas protegidas: só acessíveis com token válido
router.get("/", authMiddleware, listar)
router.post("/", authMiddleware, agendar)

// Rota pública para buscar CEP (não precisa de token)
router.get("/cep/:cep", buscarCep)

module.exports = router
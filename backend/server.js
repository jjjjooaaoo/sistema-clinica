require("dotenv").config()

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB conectado")
})
.catch(err => {
  console.log("ERRO REAL DO MONGO:")
  console.log(err)

// Rotas
const authRoutes = require("./routes/authRoutes")
const consultaRoutes = require("./routes/consultaRoutes")

app.use("/auth", authRoutes)
app.use("/consulta", consultaRoutes)

// Rota teste
app.get("/", (req, res) => {
    res.send("API da clínica funcionando")
})

// Porta
const PORT = 5000

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})
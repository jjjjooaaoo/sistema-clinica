const Consulta = require("../models/Consulta")
const User = require("../models/User")
const { buscarEndereco } = require("../services/cepService")
const { buscarClima } = require("../services/climaService")


exports.agendar = async (req, res) => {
  try {

    const { paciente, data, hora, cep } = req.body

    if (!paciente || !data || !hora || !cep) {
      return res.status(400).json({ msg: "Preencha todos os campos" })
    }

    const endereco = await buscarEndereco(cep)

    const climaConsulta = await buscarClima(endereco.cidade)

    // Verifica se já existe consulta no mesmo dia/hora
    const consultaExistente = await Consulta.findOne({ data, hora })
    if (consultaExistente) {
      return res.status(400).json({ msg: "Horário já agendado" })
    }

    const consulta = new Consulta({
      paciente,
      data,
      hora,
      cep,
      endereco: endereco.rua,
      cidade: endereco.cidade,
      clima: climaConsulta
    })

    await consulta.save()

    res.json({
      msg: "Consulta agendada com sucesso",
      consulta
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      msg: "Erro ao agendar consulta"
    })
  }
}

exports.buscarCep = async (req, res) => {
  try {

    const { cep } = req.params

    const endereco = await buscarEndereco(cep)

    res.json({
      endereco: endereco.rua,
      cidade: endereco.cidade
    })

  } catch (error) {

    res.status(500).json({
      msg: "Erro ao buscar CEP"
    })
  }
}

exports.listar = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) return res.status(401).json({ msg: "Usuário não encontrado" })
    if (user.tipo !== "secretario") {
      return res.status(403).json({ msg: "Acesso negado: apenas secretários" })
    }

    console.log("Buscando consultas...")
    const consultas = await Consulta.find()
    console.log("Consultas encontradas:", consultas)
    res.json(consultas)

  } catch (error) {

    console.error("ERRO REAL:", error)

    res.status(500).json({
      msg: "Erro ao buscar consultas"
    })
  }
}
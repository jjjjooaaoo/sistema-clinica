const Consulta = require("../models/Consulta")
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
      rua: endereco.rua,
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

    const consultas = await Consulta.find()

    res.json(consultas)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      msg: "Erro ao buscar consultas"
    })
  }
}
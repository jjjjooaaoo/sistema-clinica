const axios = require("axios")

async function buscarEndereco(cep) {

  try {

    if (!cep || cep.length !== 8) {
      throw new Error("CEP inválido")
    }

    const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)

    // verifica erro da API
    if (res.data.erro) {
      throw new Error("CEP não encontrado")
    }

    return {
      rua: res.data.logradouro,
      bairro: res.data.bairro,
      cidade: res.data.localidade,
      estado: res.data.uf
    }

  } catch (error) {

    console.error("Erro ao buscar CEP:", error.message)

    throw new Error("Erro ao buscar endereço")
  }
}

module.exports = { buscarEndereco }
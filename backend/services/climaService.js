const axios = require("axios")

async function buscarClima(cidade) {

  try {

    // pega a API KEY do .env
    const api = process.env.WEATHER_KEY

    if (!api) {
      throw new Error("API KEY não definida")
    }

    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${api}&lang=pt_br&units=metric`
    )

    return res.data.weather[0].description

  } catch (error) {

    console.error("Erro ao buscar clima:", error.message)

    throw new Error("Erro ao buscar clima")
  }
}

module.exports = { buscarClima }
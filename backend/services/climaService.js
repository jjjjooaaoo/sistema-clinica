const axios = require("axios")

async function buscarClima(cidade) {

  try {

    const api = process.env.WEATHER_KEY

    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${api}&lang=pt_br`
    )

    return res.data.weather[0].description

  } catch (error) {

    console.error("Erro ao buscar clima:", error.message)

    return "Clima não disponível"
  }
}

module.exports = { buscarClima }
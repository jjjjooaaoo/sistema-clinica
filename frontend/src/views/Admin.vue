<template>
  <div>
    <h2>Painel Administrativo</h2>

    <button @click="carregarConsultas">
      Carregar Consultas
    </button>

    <ul v-if="consultas.length > 0">
      <li v-for="c in consultas" :key="c._id">
        {{ c.paciente }} - {{ c.data }} - {{ c.hora }} <br>
        📍 {{ c.endereco }} - {{ c.cidade }} <br>
        🌤️ {{ c.clima }}
        <hr>
      </li>
    </ul>

    <p v-else>Nenhuma consulta carregada</p>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      consultas: []
    }
  },

  methods: {
    async carregarConsultas() {
      try {

        const res = await axios.get("http://localhost:5000/consulta")

        this.consultas = res.data

      } catch (error) {

        console.error("Erro ao buscar consultas:", error)

      }
    }
  }
}
</script>
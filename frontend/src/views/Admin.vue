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
import api from "../services/api"

export default {
  data() {
    return {
      consultas: [],
      userTipo: ""
    }
  },
  created() {
    this.userTipo = localStorage.getItem("userTipo") || ""
    if (this.userTipo !== "secretario") {
      alert("Acesso negado: apenas secretários podem acessar o painel")
      this.$router.push("/agendar")
    }
  },
  methods: {
    async carregarConsultas() {
      try {
        // Pega o token salvo no localStorage
        const token = localStorage.getItem("token")
        if (!token) {
          alert("Você precisa estar logado para acessar as consultas")
          return
        }

        // Faz a requisição para o backend enviando o token
        const res = await api.get(
          "/consulta",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        // Atualiza o array de consultas
        this.consultas = res.data

      } catch (error) {
        console.error("Erro ao buscar consultas:", error)

        // Mensagem amigável para o usuário
        alert(error.response?.data?.msg || "Erro ao buscar consultas")
      }
    }
  }
}
</script>
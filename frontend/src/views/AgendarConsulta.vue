<template>
  <div class="agendar-container">
    <h2>Agendar Consulta</h2>
    <form @submit.prevent="agendar">
      <label for="paciente">Nome do Paciente:</label>
      <input v-model="paciente" type="text" name="paciente" id="paciente" required />
      <br /><br />
      <label for="data">Data:</label>
      <input v-model="data" type="date" name="data" id="data" required />
      <br /><br />
      <label for="hora">Hora:</label>
      <input v-model="hora" type="time" name="hora" id="hora" required />
      <br /><br />
      <label for="cep">CEP:</label>
      <input v-model="cep" type="text" name="cep" id="cep" maxlength="8" @blur="buscarCep" required />
      <br /><br />
      <div v-if="endereco">
        <strong>Endereço:</strong> {{ endereco }}
      </div>
      <br />
      <button type="submit">Agendar</button>
    </form>
  </div>
</template>
<script>
import api from "../services/api"

export default {
  data() {
    return {
      paciente: "",
      data: "",
      hora: "",
      cep: "",
      endereco: ""
    }
  },

  methods: {

    async buscarCep() {
      try {

        if (this.cep.length !== 8) return

        const res = await api.get(`/consulta/cep/${this.cep}`)

        
        this.endereco = `${res.data.rua} - ${res.data.cidade}`

      } catch (error) {
        console.log("Erro ao buscar CEP")
      }
    },

    async agendar() {
      try {

        const token = localStorage.getItem("token")

        await api.post(
          "/consulta",
          {
            paciente: this.paciente,
            data: this.data,
            hora: this.hora,
            cep: this.cep
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        alert("Consulta agendada com sucesso!")

      } catch (error) {

        alert(error.response?.data?.msg || "Erro ao agendar")

      }
    }
  }
}
</script>
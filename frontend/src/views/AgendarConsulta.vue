<template>
  <div>
    <h2>Agendar Consulta</h2>

    <input v-model="paciente" placeholder="Nome do paciente" />
    <br /><br />

    <input v-model="data" type="date" />
    <br /><br />

    <input v-model="hora" type="time" />
    <br /><br />

    <input v-model="cep" placeholder="CEP" @blur="buscarCep" />
    <br /><br />

    <p v-if="endereco">Endereço: {{ endereco }}</p>

    <br />

    <button @click="agendar">Agendar</button>
  </div>
</template>

<script>
import axios from "axios"

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

        const res = await axios.get(
          `http://localhost:5000/consulta/cep/${this.cep}`
        )

        this.endereco = res.data.endereco

      } catch (error) {
        console.log("Erro ao buscar CEP")
      }
    },

    async agendar() {
      try {

        const token = localStorage.getItem("token")

        await axios.post(
          "http://localhost:5000/consulta",
          {
            paciente: this.paciente,
            data: this.data,
            hora: this.hora,
            cep: this.cep
          },
          {
            headers: {
              Authorization: token
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
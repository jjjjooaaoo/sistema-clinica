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
          `https://sistema-clinica-3ex8.onrender.com/consulta/cep/${this.cep}`
        )

        
        this.endereco = `${res.data.rua} - ${res.data.cidade}`

      } catch (error) {
        console.log("Erro ao buscar CEP")
      }
    },

    async agendar() {
      try {

        const token = localStorage.getItem("token")

        await axios.post(
          `${process.env.VUE_APP_API_URL}/consulta/consultas`,
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
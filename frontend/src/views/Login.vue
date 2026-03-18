<template>
  <div>
    <h2>Login</h2>

    <input v-model="email" placeholder="Email" />
    <br /><br />

    <input v-model="senha" type="password" placeholder="Senha" />
    <br /><br />

    <button @click="login">Entrar</button>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      email: "",
      senha: ""
    }
  },

  methods: {
    async login() {
      try {

        const res = await axios.post(
          "http://localhost:5000/auth/login", // 🔥 corrigido
          {
            email: this.email,
            senha: this.senha
          }
        )

        localStorage.setItem("token", res.data.token)

        alert("Login realizado com sucesso!")

      } catch (error) {

        alert(error.response?.data?.msg || "Erro no login")

      }
    }
  }
}
</script>
<template>
  <div class="login-container">
    <h2>Login</h2>

    <input
      v-model="email"
      type="email"
      placeholder="Email"
      name="email"
      id="login-email"
    />
    <br /><br />

    <input
      v-model="senha"
      type="password"
      placeholder="Senha"
      name="senha"
      id="login-senha"
    />
    <br /><br />

    <button @click="login">Entrar</button>
  </div>
</template>

<script>
import router from "@/router"

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
        if (!this.email || !this.senha) {
          alert("Preencha todos os campos")
          return
        }

        // Importa o objeto api do services/api.js
        const api = (await import('../services/api')).default

        const res = await api.post('/auth/login', {
          email: this.email,
          senha: this.senha
        })

        localStorage.setItem("token", res.data.token)
        alert("Login realizado com sucesso!")
        this.email = ""
        this.senha = ""
        router.push("/admin")
      } catch (error) {
        console.error("Erro no login:", error.response?.data || error)
        alert(error.response?.data?.msg || "Erro no login")
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  text-align: center;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

button {
  padding: 10px 20px;
  cursor: pointer;
}
</style>
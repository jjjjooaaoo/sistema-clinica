import axios from "axios"

const api = axios.create({
  baseURL: "https://sistema-clinica-3ex8.onrender.com"
})

export default api
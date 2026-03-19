const jwt = require("jsonwebtoken")

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ msg: "Token não fornecido" })
  }

  // Espera o formato "Bearer TOKEN"
  const token = authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ msg: "Token inválido" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "segredo")
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ msg: "Token inválido" })
  }
}
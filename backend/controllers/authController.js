const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
  const { nome, email, senha, tipo } = req.body

  const senhaHash = await bcrypt.hash(senha, 10)

  const user = new User({
    nome,
    email,
    senha: senhaHash,
    tipo: tipo || "paciente"
  })

  await user.save()
  res.json({ msg: "Usuário criado" })
}

exports.login = async (req,res)=>{

  const {email,senha} = req.body

  const user = await User.findOne({email})

  if(!user)
    return res.status(400).json({msg:"Usuário não encontrado"})

  const senhaValida = await bcrypt.compare(senha,user.senha)

  if(!senhaValida)
    return res.status(401).json({msg:"Senha inválida"})

  const token = jwt.sign({ id: user._id, tipo: user.tipo }, process.env.JWT_SECRET)

  res.json({ token })
}
const jwt = require("jsonwebtoken")

module.exports = function(req,res,next){

  const token = req.headers.authorization

  if(!token)
    return res.status(401).json({msg:"Sem acesso"})

  try{

    const decoded = jwt.verify(token,"segredo")
    req.user = decoded

    next()

  }catch{

    return res.status(401).json({msg:"Token inválido"})
  }
}
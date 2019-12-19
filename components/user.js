const db = require("../conexao.js")
const bcrypt = require("bcryptjs")

//CRIPTOGRAFIA DE SENHA
const encripta = senha => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(senha, salt)
}

//INSERIR
const insert = async (nome,email,senha) => {
  
  const query = "INSERT INTO usuarios (nome,email,senha) VALUES ($1,$2,$3)"
  result = await db.query(query,[nome,email,encripta(senha)])
  console.log(result.rows);
  return result.rows
  
}

//VERIFICA SE USUÁRIO EXISTE
const userExists = async (email) => {
  
    const query = "SELECT * FROM usuarios WHERE email = $1"
    const userDoBanco = await db.query(query,[email])
    if(userDoBanco.rowCount > 0) {
      return true
    } else return false
}

//EDITAR
const update = async (nome,email,senha, id) => {
  
  const verifica = "SELECT * FROM usuarios WHERE id = $1"
  var result = await db.query(verifica,[id])
  if(!result.rows.length > 0){
    console.log("ITEM INEXISTENTE");
    return "ITEM INEXISTENTE"
  }
  const query = "UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id=$4 RETURNING *"
  result = await db.query(query,[nome,email,encripta(senha),id])

  console.log(result.rows);
  return result.rows
}

//DELETAR
const deletar = async (id) => {

  const verifica = "SELECT * FROM usuarios WHERE id = $1"
  var result = await db.query(verifica,[id])
  if(!result.rows.length > 0){
    console.log("ITEM INEXISTENTE");
    return "ITEM INEXISTENTE"
  }
  const query = "DELETE FROM usuarios WHERE id=$1"
  await db.query(query,[id])

  console.log("ITEM DELETADO");
  return "ITEM DELETADO"
  
}
//BUSCAR POR ID
const get = async (id) => {
  var result
  const query = "SELECT * FROM usuarios WHERE id = $1";
  result = await db.query(query,[id])

  return result.rows
}

//BUSCAR POR NOME
const getByName = async (nome) => {
  let result
  let novoNome = '%' + nome + '%'
  const query = "SELECT * FROM usuarios WHERE nome ILIKE $1"
  result = await db.query(query, [novoNome])
  return result.rows
}

//BUSCAR TODOS
const getAll = async() => {
  var result
  const query = " SELECT * FROM  usuarios"

  result = await db.query(query)

  return result.rows
}

//lOGIN
const login = async(email, senha) => {
  let result
  
  const query = "SELECT u.email, u.senha AS senha FROM usuarios AS u WHERE u.email = $1"
   result = await db.query(query, [email])
   if(result.rowCount > 0 && bcrypt.compareSync(senha, result.rows[0].senha)) {
    return true
  } else return false
}

module.exports = {
  getAll,insert,update,deletar,get, encripta, userExists, login, getByName
} 
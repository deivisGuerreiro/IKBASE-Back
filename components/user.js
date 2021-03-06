const db = require("../conexao.js")
const bcrypt = require("bcryptjs")

//CRIPTOGRAFIA DE SENHA
const encripta = senha => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(senha, salt)
}

//INSERIR
const insert = async (nome, email, senha) => {

  const query = "INSERT INTO usuarios (nome,email,senha) VALUES ($1,$2,$3)"
  result = await db.query(query, [nome, email, encripta(senha)])
  const query2 = "SELECT * FROM usuarios WHERE nome = $1 and email = $2"
  result2 = await db.query(query2, [nome, email])
  return result2.rows[0].id

}

//VERIFICA SE USUÁRIO EXISTE
const userExists = async (email) => {

  const query = "select usuarios.id, usuarios.nome, usuarios.email from usuarios where email = $1"
  //const query = "SELECT * FROM usuarios WHERE email = $1"
  const userDoBanco = await db.query(query, [email])
  if (userDoBanco.rowCount > 0) {
    return true
  } else return false
}

//EDITAR
const update = async (nome, email, senha, id) => {

  const verifica = "SELECT * FROM usuarios WHERE id = $1"
  var result = await db.query(verifica, [id])
  if (!result.rows.length > 0) {
    console.log("ITEM INEXISTENTE");
    return "ITEM INEXISTENTE"
  }
  const query = "UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id=$4 RETURNING *"
  result = await db.query(query, [nome, email, encripta(senha), id])

  console.log(result.rows);
  return result.rows
}

//DELETAR
const deletar = async (id) => {

  const verifica = "SELECT * FROM usuarios WHERE id = $1"
  var result = await db.query(verifica, [id])
  if (!result.rows.length > 0) {
    console.log("ITEM INEXISTENTE");
    return "ITEM INEXISTENTE"
  }
  const query = "DELETE FROM usuarios WHERE id=$1"
  await db.query(query, [id])

  console.log("ITEM DELETADO");
  return "ITEM DELETADO"

}
//BUSCAR POR ID
const get = async (id) => {
  var result
  const query = "select usuarios.nome, usuarios.email from usuarios where id = $1"
  //const query = "SELECT * FROM usuarios WHERE id = $1";
  result = await db.query(query, [id])

  return result.rows
}

//BUSCAR POR NOME
const getByName = async (nome) => {
  let result
  let novoNome = '%' + nome + '%'
  const query = "select usuarios.nome, usuarios.email from usuarios where nome ILIKE $1"
  //const query = "SELECT * FROM usuarios WHERE nome ILIKE $1"
  result = await db.query(query, [novoNome])
  return result.rows
}

//BUSCAR TODOS
const getAll = async () => {
  var result
  const query = " SELECT usuarios.id, usuarios.nome, usuarios.email FROM  usuarios"

  result = await db.query(query)

  return result.rows
}

//lOGIN
const login = async (email, senha) => {
  let result

  const query = "SELECT u.email, u.senha AS senha FROM usuarios AS u WHERE u.email = $1"
  result = await db.query(query, [email])
  if (result.rowCount > 0 && bcrypt.compareSync(senha, result.rows[0].senha)) {
    const query2 = "SELECT * FROM usuarios WHERE  email = $1"
    result2 = await db.query(query2, [email])
    return result2.rows[0]
  } else return false
}

module.exports = {
  getAll,
  insert,
  update,
  deletar,
  get,
  encripta,
  userExists,
  login,
  getByName
}
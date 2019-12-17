const db = require("../conexao.js")


//INSERIR
const insert = async (nome,email,senha) => {

  const query = "insert into usuarios (nome,email,senha) values ($1,$2,$3)"
  result = await db.query(query,[nome,email,senha])

  console.log(result.rows);
  return result.rows
}

//EDITAR
const update = async (nome,email,id) => {

  const verifica = "select * from usuarios where id = $1"
  var result = await db.query(verifica,[id])
  if(!result.rows.length > 0){
    console.log("ITEM INEXISTENTE");
    return "ITEM INEXISTENTE"
  }
  const query = "update usuarios set nome = $1, email = $2 where id=$3"
  result = await db.query(query,[nome,email,id])

  console.log(result.rows);
  return result.rows
}

//DELETAR
const deletar = async (id) => {

  const verifica = "select * from usuarios where id = $1"
  var result = await db.query(verifica,[id])
  if(!result.rows.length > 0){
    console.log("ITEM INEXISTENTE");
    return "ITEM INEXISTENTE"
  }
  const query = "delete from usuarios where id=$1"
  await db.query(query,[id])

  console.log("ITEM DELETADO");
  return "ITEM DELETADO"
  
}
//BUSCAR POR ID
const get = async (id) => {
  var result
  const query = "select * from usuarios where id = $1";
  result = await db.query(query,[id])


  return result.rows
  
}

//BUSCAR TODOS
const getAll = async() => {
  var result
  const query = " SELECT * FROM  usuarios"

  result = await db.query(query)

  return result.rows
}

module.exports = {
  getAll,insert,update,deletar,get
} 
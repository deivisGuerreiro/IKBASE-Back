const db = require("../conexao.js")

const getAll = async () => {

  const query = "select * from prefeitos"
  result = await db.query(query)

  console.log(result.rows);
  return result.rows
}

const insert = async (id_user,duvida,tecnologias) => {

  const query = "insert into usuario (nome,email,senha) values ($1,$2,$3)"
  result = await db.query(query,[nome,email,senha])

  console.log(result.rows);
  return result.rows
}

const update = async (nome,email,id) => {

  const verifica = "select * from usuario where id = $1"
  var result = await db.query(verifica,[id])
  if(!result.rows.length > 0){
    console.log("ITEM INEXISTENTE");
    return "ITEM INEXISTENTE"
  }
  const query = "update usuario set nome = $1, email = $2 where id=$3"
  result = await db.query(query,[nome,email,id])

  console.log(result.rows);
  return result.rows
}

const deletar = async (id) => {

  const verifica = "select * from usuario where id = $1"
  var result = await db.query(verifica,[id])
  if(!result.rows.length > 0){
    console.log("ITEM INEXISTENTE");
    return "ITEM INEXISTENTE"
  }
  const query = "delete from usuario where id=$1"
  await db.query(query,[id])

  console.log("ITEM DELETADO");
  return "ITEM DELETADO"
  
}

const get = async (id) => {

  var result
  const query = "select * from usuario where id = $1";
  result = await db.query(query,[id])


  return result.rows
  
}

module.exports = {
  getAll,insert,update,deletar,get
} 
const db = require("../conexao.js")

const getAll = async (id_postagem) => {

  const query = "select * from comentario where postagem_id = $1"
  result = await db.query(query,[id_postagem])
  for(linha of result.rows){
    const query2 = "select nome from usuarios where id = $1";
    result2 = await db.query(query2,[linha.usuario_id])
    linha.usuario =result2.rows
    console.log(linha)
  }
  return result.rows
}

const insert = async (id_postagem,id_user,resposta) => {
  const data = new Date()
  const query = "insert into comentario (postagem_id,usuario_id,resposta,data) values ($1,$2,$3,$4)"
  result = await db.query(query,[id_postagem,id_user,resposta,data])
  
  return true
}

const update = async (resposta,id) => {

  const verifica = "select * from comentario where id = $1"
  var result = await db.query(verifica,[id])
  if(!result.rows.length > 0){
    console.log("ITEM INEXISTENTE");
    return "ITEM INEXISTENTE"
  }
  const query = "update comentario set resposta = $1 where id=$2"
  result = await db.query(query,[resposta,id])

  console.log(result.rows);
  return result.rows
}

const deletar = async (id) => {

  const verifica = "select * from comentario where id = $1"
  var result = await db.query(verifica,[id])
  if(!result.rows.length > 0){
    console.log("ITEM INEXISTENTE");
    return "ITEM INEXISTENTE"
  }
  const query = "delete from comentario where id=$1"
  await db.query(query,[id])

  console.log("ITEM DELETADO");
  return "ITEM DELETADO"
  
}

//BUSCAR TODOS COMENTÁRIOS DO USUÁRIO
const getComentUser = async (id_user) => {
  const query = "select usuarios.nome, usuarios.email, comentario.resposta, comentario.\"data\" from usuarios inner join comentario on comentario.usuario_id = usuarios.id where usuarios.id = $1;"
  let result = await db.query(query, [id_user])
  return result.rows
}

module.exports = {
  getAll,insert,update,deletar, getComentUser
} 
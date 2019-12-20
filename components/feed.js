const db = require("../conexao.js")

const getAll = async () => {

  const query = "select postagem.id,postagem.duvida,postagem.data,usuarios.nome from postagem inner join usuarios on postagem.usuario_id = usuarios.id"
  result = await db.query(query)
  for(linha of result.rows){
    const query2 = "select * from postagem_tecnologia where postagem_id = $1";
    result2 = await db.query(query2,[linha.id])
    linha.tecnologias =result2.rows
    const queryComentario = "select * from comentario where postagem_id = $1";
    coments = await db.query(queryComentario,[linha.id])
    linha.comentarios =coments.rows
  }
  return result.rows
}

const insert = async (id_user,duvida,tecnologias) => {
  const data = new Date()
  const query = "insert into postagem (usuario_id,duvida,data) values ($1,$2,$3)"
  result = await db.query(query,[id_user,duvida,data])
  const query2 = "select * from postagem where usuario_id = $1 and duvida = $2 and data =$3"
  result2 = await db.query(query2,[id_user,duvida,data])
  console.log(result2.rows[0].id);
  for(linha of tecnologias){
    const query = "insert into postagem_tecnologia (postagem_id,tecnologia_id) values ($1,$2)"
    result = await db.query(query,[result2.rows[0].id,linha.id])
    
  }

  
  return true
}

const update = async (duvida,tecnologias,id) => {

  const verifica = "select * from postagem where id = $1"
  var result = await db.query(verifica,[id])
  if(!result.rows.length > 0){
    console.log("ITEM INEXISTENTE");
    return "ITEM INEXISTENTE"
  }
  const query = "update postagem set duvida = $1 where id=$2"
  result = await db.query(query,[duvida,id])
  const query3 = "delete from postagem_tecnologia where postagem_id=$1"
  await db.query(query3,[id])
  for(linha of tecnologias){
    const query2 = "insert into postagem_tecnologia (postagem_id,tecnologia_id) values ($1,$2)"
    result2 = await db.query(query2,[id,linha.id])
    
  }

  console.log(result.rows);
  return result.rows
}

const deletar = async (id) => {

  const verifica = "select * from postagem where id = $1"
  var result = await db.query(verifica,[id])
  if(!result.rows.length > 0){
    console.log("ITEM INEXISTENTE");
    return "ITEM INEXISTENTE"
  }
  const query = "delete from postagem where id=$1"
  await db.query(query,[id])
  const query3 = "delete from postagem_tecnologia where postagem_id=$1"
  await db.query(query3,[id])

  console.log("ITEM DELETADO");
  return "ITEM DELETADO"
  
}

const get = async (id) => {

  var result
  const query = "select postagem.id,postagem.duvida,postagem.data,usuarios.nome from postagem inner join usuarios on postagem.usuario_id = usuarios.id where postagem.id = $1";
  result = await db.query(query,[id])
  const query2 = "select * from postagem_tecnologia where postagem_id = $1";
  result2 = await db.query(query2,[id])
  result.rows[0].tecnologias =result2.rows
  const queryComentario = "select * from comentario where postagem_id = $1";
  coments = await db.query(queryComentario,[id])
  result.rows[0].comentarios =coments.rows

  return result.rows
  
}
//BUSCAR TODAS PUBLICAÇÕES DO USUARIO
const getPostUser = async (id_user) => {
  const query = "select usuarios.nome, usuarios.email, postagem.duvida, postagem.\"data\" from usuarios inner join postagem on postagem.usuario_id=usuarios.id where usuarios.id= $1;"
  let result = await db.query(query,[id_user])
  return result.rows
}

module.exports = {
  getAll,insert,update,deletar,get, getPostUser
} 
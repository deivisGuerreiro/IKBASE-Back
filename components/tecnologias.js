const db = require('../conexao.js')

const getAll = async () => {

    const query = "select * from tecnologia"
    result = await db.query(query)

    return result.rows
}

const get = async (id) => {

    const query = "select * from tecnologia where id = $1"
    result = await db.query(query,[id])

    return result.rows
}

const getByName = async(nome) => {
    let novoNome = '%' + nome + '%'
    const query = "select * from tecnologia where nome ILIKE $1"
    result = await db.query(query,[novoNome])

    return result.rows
}

const insertTecnologia = async (nome) => {
    const query = "INSERT INTO tecnologia (nome) VALUES ($1)"
    result = await db.query(query, [nome])
    
    return result.rows
}

module.exports = {
    get,
    getAll,
    getByName,
    insertTecnologia
}
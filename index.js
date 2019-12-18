//Configuração do Express.js
const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  app = express(),
  port = 8080;

const path = require('path');

app.use(cors())
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());



// Constantes dos controllers
const feed = require("./components/feed")
const comentario = require("./components/comentario")
const user = require("./components/user")

//ROTAS IKBASE
//FEED


app.post('/create/post', (req, res) => {
  //Cria uma postagem
  const pastagem = feed.insert(req.body.id_user, req.body.duvida, req.body.tecnologias).then(postagem => res.json(postagem))
});

app.get('/getAll/post', (req, res) => {
  //Pega todos os posts
  const postagens = feed.getAll().then(postagens => res.json(postagens))
});

app.put('/update/post', (req, res) => {
  //Atualiza uma postagem pelo (id)
  const pastagem = feed.update(req.body.duvida, req.body.tecnologias, req.body.id).then(postagem => res.json(postagem))
});

app.delete('/delete/post/:id', (req, res) => {
  //Deleta uma postagem pelo (id) na url
  const postagem = feed.deletar(req.params.id).then(resposta => res.json(resposta))
})

app.get('/get/post/:id', (req, res) => {
  //Pega as informações de uma postagem pelo (id) que está url
  const postagem = feed.get(req.params.id).then(postagem => res.json(postagem))
})
//fim ROTAS FEED






//ROTAS Usuario
app.get('/verifica/user', (req, res) => {
  //verifica existencia de user
  const usuario = user.userExists(req.body.email)
    .then(usuario => res.send(usuario))
})

app.post('/create/user', (req, res) => {
  //Cria um user
  const usuario = user.insert(req.body.nome, req.body.email, req.body.senha)
    .then(usuario => res.json(usuario))
});

app.get('/getAll/users', (req, res) => {
  //Pega todos os users
  const users = user.getAll()
    .then(users => res.json(users))
});

app.put('/update/user', (req, res) => {
  //Atualiza um user pelo (id)
  console.log(req.body.id)
  const usuario = user.update(req.body.nome, req.body.email, req.body.senha, req.body.id)
    .then(usuario => res.json(usuario.params))
    .catch(err => {
      console.log(err)
    })
});

app.delete('/delete/user/:id', (req, res) => {
  //Deleta um user pelo (id) na url
  const usuario = user.deletar(req.params.id).then(resposta => res.json(resposta))
})

app.get('/get/user/:id', (req, res) => {
  //Pega as informações de um user pelo (id) que está url
  console.log(req.params.id)
  const usuario = user.get(req.params.id).then(usuario => res.json(usuario))
})

//fim ROTAS USER






//COMENTARIO

app.post('/create/comentario', (req, res) => {
  //Cria um comentario
  const coment = comentario.insert(req.body.id_postagem, req.body.id_user, req.body.resposta).then(coment => res.json(coment))
});

app.get('/getAll/comentario/:id', (req, res) => {
  //Pega todos os comentarios de uma publicação
  const coments = comentario.getAll(req.params.id).then(coments => res.json(coments))
});

app.put('/update/comentario', (req, res) => {
  //Atualiza um comentario pelo (id)
  const coment = comentario.update(req.body.resposta, req.body.id).then(coment => res.json(coment))
});

app.delete('/delete/comentario/:id', (req, res) => {
  //Deleta um comentario pelo (id) na url
  const coment = comentario.deletar(req.params.id).then(resposta => res.json(resposta))
})


//fim ROTAS COMENTARIO


//Executa o servidor
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
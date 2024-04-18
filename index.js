require("dotenv").config();
const conn = require("./db/conn");

const Usuario = require("./models/Usuario");

const Jogo = require("./models/Jogo");

const express = require("express");
const app = express();

app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json());

app.get("/usuarios/novo", (req, res)=>{
    res.sendFile(`${__dirname}/views/formUsuario.html`);
})

app.get("/jogos/novo", (req, res)=>{
    res.sendFile(`${__dirname}/views/formJogo.html`);
})

app.post("/usuarios/novo", async (req, res)=>{
    const dadosUsuario = {
        nickname: req.body.nickname,
        nome: req.body,nome,
    }

    const usuario = await Usuario.create(dadosUsuario);
    res.send("Usuario inserido sob o id " + usuario.id);
})

app.post("/jogos/novo", async (req, res)=>{
    const dadosJogo = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        precoBase: req.body.precoBase,
    }

    const jogo = await Jogo.create(dadosJogo);
    res.send("Jogo inserido sob o id " + jogo.id);
})

app.listen(8000, ()=>{
    console.log("Server rodando!");
});

conn
    .sync()
    .then(() => {
        console.log("Conectado e sincronizado com o banco de dados com sucesso!");
    })
    .catch((err) => {
        console.log("Ocorreu um erro: " + err);
    });

//conn
//    .authenticate()
//    .then(() => {
//        console.log("Conectado ao banco de dados com sucesso!");
//    })
//    .catch((err) => {
//        console.log("Ocorreu um erro: " + err);
//    });
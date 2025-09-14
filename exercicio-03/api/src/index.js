const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let perguntas = [
  {
    id: 1,
    texto: "Qual é a capital da França?",
    opcoes: ["Paris", "Londres", "Berlim", "Roma"],
    respostaCorreta: "Paris",
  },
  {
    id: 2,
    texto: "Qual linguagem é usada para estilizar páginas web?",
    opcoes: ["HTML", "CSS", "Python", "C++"],
    respostaCorreta: "CSS",
  },
  {
    id: 3,
    texto: "Quem desenvolveu a teoria da relatividade?",
    opcoes: ["Einstein", "Newton", "Galileu", "Tesla"],
    respostaCorreta: "Einstein",
  },
];

let indiceAtual = 0;

app.get("/pergunta", (req, res) => {
  if (indiceAtual < perguntas.length) {
    const { id, texto, opcoes } = perguntas[indiceAtual];
    res.json({ id, texto, opcoes });
  } else {
    res.json({ fim: true });
  }
});

app.post("/responder", (req, res) => {
  const { resposta } = req.body;
  const pergunta = perguntas[indiceAtual];

  if (!pergunta) {
    return res.status(400).json({ erro: "Não há mais perguntas." });
  }

  const correta = pergunta.respostaCorreta === resposta;
  indiceAtual++;
  res.json({ correta });
});

app.post("/reiniciar", (req, res) => {
  indiceAtual = 0;
  res.json({ mensagem: "Quiz reiniciado." });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

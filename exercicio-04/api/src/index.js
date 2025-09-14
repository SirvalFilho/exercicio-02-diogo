const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// Lista de palavras
const palavrasSecretas = [
  "javascript",
  "vuejs",
  "express",
  "forca",
  "computador",
];

// Estado do jogo (em memória)
let jogo = {
  palavra: "",
  letrasCorretas: [],
  letrasErradas: [],
  maxErros: 6,
  status: "playing", // playing, won, lost
};

// Iniciar novo jogo
app.get("/jogo", (req, res) => {
  const palavraSelecionada =
    palavrasSecretas[Math.floor(Math.random() * palavrasSecretas.length)];
  jogo = {
    palavra: palavraSelecionada,
    letrasCorretas: [],
    letrasErradas: [],
    maxErros: 6,
    status: "playing",
  };

  const estadoPalavra = jogo.palavra
    .split("")
    .map((letra) => (jogo.letrasCorretas.includes(letra) ? letra : "_"))
    .join("");

  res.json({
    estadoPalavra,
    erros: jogo.letrasErradas.length,
    status: jogo.status,
  });
});

// Enviar letra
app.post("/jogo", (req, res) => {
  const { letra } = req.body;
  if (!letra || letra.length !== 1 || jogo.status !== "playing") {
    return res
      .status(400)
      .json({ message: "Letra inválida ou jogo não está ativo." });
  }

  const letraMin = letra.toLowerCase();

  if (jogo.palavra.includes(letraMin)) {
    if (!jogo.letrasCorretas.includes(letraMin)) {
      jogo.letrasCorretas.push(letraMin);
    }
  } else {
    if (!jogo.letrasErradas.includes(letraMin)) {
      jogo.letrasErradas.push(letraMin);
    }
  }

  const estadoPalavra = jogo.palavra
    .split("")
    .map((letra) => (jogo.letrasCorretas.includes(letra) ? letra : "_"))
    .join("");

  if (estadoPalavra === jogo.palavra) {
    jogo.status = "won";
  } else if (jogo.letrasErradas.length >= jogo.maxErros) {
    jogo.status = "lost";
  }

  res.json({
    estadoPalavra,
    erros: jogo.letrasErradas.length,
    status: jogo.status,
    letrasErradas: jogo.letrasErradas,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

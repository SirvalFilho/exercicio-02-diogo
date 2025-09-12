const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const options = [
  { id: 1, name: "Opção A" },
  { id: 2, name: "Opção B" },
  { id: 3, name: "Opção C" },
];

const votes = {
  1: 0,
  2: 0,
  3: 0,
};

app.get("/options", (req, res) => {
  res.json(options);
});

app.post("/vote", (req, res) => {
  const { id } = req.body;

  if (!id || !votes.hasOwnProperty(id)) {
    return res.status(400).json({ message: "Opção inválida para votar" });
  }

  votes[id] += 1;
  res.status(201).json({ message: "Voto registrado com sucesso!" });
});

app.get("/results", (req, res) => {
  const results = options.map((opt) => ({
    id: opt.id,
    name: opt.name,
    votes: votes[opt.id] || 0,
  }));

  res.json(results);
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

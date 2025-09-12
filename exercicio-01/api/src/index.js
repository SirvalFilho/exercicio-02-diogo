const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const tasks = [];
let counter = 0;

app.get("/tasks", (req, res) => {
  if (tasks.length) {
    res.status(200).json(tasks);
  } else {
    res.status(404).json({ message: "Nenhuma tarefa cadastrada!" });
  }
});

app.post("/tasks", (req, res) => {
  const titulo = req.body.titulo ?? "???";

  const newTask = {
    id: counter++,
    titulo: titulo,
    status: "Pendente",
  };

  tasks.push(newTask);

  res.status(201).json({ message: "Atividade Cadastrada com sucesso!" });
});

app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).send({
      message: `Não foi possível localizar uma task com id: ${id}`,
    });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...req.body,
  };

  res.status(200).json({ message: "Atualizado com sucesso!" });
});

app.listen(3000, () => {
  console.log("A aplicação está no ar!");
});

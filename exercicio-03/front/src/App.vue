<template>
  <div class="app">
    <h1>Quiz Interativo</h1>

    <div v-if="!fim">
      <h2>{{ pergunta.texto }}</h2>
      <ul>
        <li v-for="opcao in pergunta.opcoes" :key="opcao">
          <button @click="responder(opcao)">{{ opcao }}</button>
        </li>
      </ul>

      <p v-if="resposta !== null">
        <strong>{{ resposta ? "✅ Correto!" : "❌ Errado!" }}</strong>
      </p>
    </div>

    <div v-else>
      <h2>Fim do quiz!</h2>
      <button @click="reiniciar">Reiniciar</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pergunta: {},
      resposta: null,
      fim: false,
    };
  },
  methods: {
    async carregarPergunta() {
      try {
        const res = await fetch("http://localhost:3000/pergunta");
        const data = await res.json();

        if (data.fim) {
          this.fim = true;
        } else {
          this.pergunta = data;
          this.resposta = null;
        }
      } catch (err) {
        console.error("Erro ao carregar pergunta:", err);
      }
    },

    async responder(opcao) {
      try {
        const res = await fetch("http://localhost:3000/responder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resposta: opcao }),
        });

        const data = await res.json();
        this.resposta = data.correta;

        // Espera 1 segundo antes de ir para a próxima
        setTimeout(() => {
          this.carregarPergunta();
        }, 1000);
      } catch (err) {
        console.error("Erro ao enviar resposta:", err);
      }
    },

    async reiniciar() {
      try {
        await fetch("http://localhost:3000/reiniciar", {
          method: "POST",
        });
        this.fim = false;
        this.carregarPergunta();
      } catch (err) {
        console.error("Erro ao reiniciar:", err);
      }
    },
  },
  mounted() {
    this.carregarPergunta();
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
}

.app {
  max-width: 600px;
  margin: auto;
  text-align: center;
}

button {
  margin: 5px;
  padding: 10px 20px;
  font-size: 16px;
}
</style>

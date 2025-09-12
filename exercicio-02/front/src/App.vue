<template>
  <div>
    <h1>Sistema de Votação</h1>

    <div>
      <h2>Opções para votar:</h2>
      <div v-for="option in options" :key="option.id" style="margin-bottom: 8px;">
        <button @click="vote(option.id)">
          Votar em {{ option.name }}
        </button>
      </div>
    </div>

    <div style="margin-top: 20px;">
      <button @click="loadResults">Atualizar Resultado</button>
    </div>

    <div v-if="results.length" style="margin-top: 20px;">
      <h2>Resultados:</h2>
      <ul>
        <li v-for="result in results" :key="result.id">
          {{ result.name }}: {{ result.votes }} voto(s)
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const options = ref([]);
const results = ref([]);

const loadOptions = async () => {
  try {
    const res = await fetch("http://localhost:3000/options");
    options.value = await res.json();
  } catch (error) {
    console.error("Erro ao carregar opções:", error);
  }
};

const vote = async (id) => {
  try {
    const res = await fetch("http://localhost:3000/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.status === 201) {
      alert("Voto registrado com sucesso!");
    } else {
      const data = await res.json();
      alert(`Erro: ${data.message}`);
    }
  } catch (error) {
    alert("Erro ao registrar voto.");
  }
};

const loadResults = async () => {
  try {
    const res = await fetch("http://localhost:3000/results");
    results.value = await res.json();
  } catch (error) {
    console.error("Erro ao carregar resultados:", error);
  }
};

// Carregar opções ao montar o componente
onMounted(() => {
  loadOptions();
});
</script>
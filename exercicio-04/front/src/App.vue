<template>
  <div class="container">
    <h1>🎯 Jogo da Forca</h1>

    <div class="palavra">
      <h2>{{ estadoPalavra }}</h2>
    </div>

    <div v-if="status === 'playing'" class="entrada">
      <input v-model="letra" maxlength="1" @keyup.enter="enviarLetra" placeholder="Digite uma letra" />
      <button @click="enviarLetra">Enviar</button>
    </div>

    <div class="info">
      <p>Erros: {{ erros }} / 6</p>
      <p>Letras erradas: {{ letrasErradas.join(', ') }}</p>
    </div>

    <div class="mensagem" v-if="status !== 'playing'">
      <h2 v-if="status === 'won'" style="color: green">🎉 Você venceu!</h2>
      <h2 v-else style="color: red">💀 Você perdeu!</h2>
      <button @click="iniciarJogo">Jogar Novamente</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const estadoPalavra = ref('');
const letra = ref('');
const erros = ref(0);
const status = ref('playing');
const letrasErradas = ref([]);

const iniciarJogo = async () => {
  try {
    const response = await fetch('http://localhost:3000/jogo');
    const data = await response.json();
    estadoPalavra.value = data.estadoPalavra;
    erros.value = data.erros;
    status.value = data.status;
    letrasErradas.value = [];
    letra.value = '';
  } catch (err) {
    console.error('Erro ao iniciar jogo:', err);
  }
};

const enviarLetra = async () => {
  if (!letra.value || status.value !== 'playing') return;

  try {
    const response = await fetch('http://localhost:3000/jogo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ letra: letra.value })
    });

    const data = await response.json();

    estadoPalavra.value = data.estadoPalavra;
    erros.value = data.erros;
    status.value = data.status;
    letrasErradas.value = data.letrasErradas;
    letra.value = '';
  } catch (err) {
    console.error('Erro ao enviar letra:', err);
  }
};

onMounted(iniciarJogo);
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: auto;
  text-align: center;
  font-family: sans-serif;
}
input {
  padding: 8px;
  font-size: 16px;
}
button {
  padding: 8px 12px;
  margin-left: 10px;
  font-size: 16px;
}
.mensagem {
  margin-top: 20px;
}
</style>

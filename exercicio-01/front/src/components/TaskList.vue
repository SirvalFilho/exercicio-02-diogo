<template>
    <div>
        <div>
            <form>
                <input type="text" name="titulo" placeholder="Titulo..." v-model="inputTitulo">
            </form>
            <button @click="sendToApi()">
                Enviar!
            </button>
        </div>
        <div class="container">
            <div v-for="task in currentTasks" :key="task">
                <TaskComponent :task="task" @update="updateValue" />
            </div>
        </div>

    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import TaskComponent from './TaskComponent.vue';

const currentTasks = ref();
const inputTitulo = ref();

const loadInfos = async () => {
    try {
        const response = await fetch('http://localhost:3000/tasks');
        const infos = await response.json();
        currentTasks.value = infos;
    } catch (error) {
        console.log('Algo deu errado' + error.message);
    }
};

const sendToApi = async () => {
    if (!inputTitulo.value || inputTitulo.value === '') {
        return
    }

    try {

        const newPost = {
            "titulo": inputTitulo.value
        }

        const postData = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost),
        })

        if (postData.status === 201) {
            await loadInfos();
        }

    } catch (error) {
        console.log('Algo deu errado enviando os dados...' + error.message);
    }

}

const updateValue = async (item) => {
    try {
        const putData = await fetch(`http://localhost:3000/tasks/${item.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        })
        if (putData.status === 200) {
            await loadInfos();
        }

    } catch (error) {
        console.log(error.message)
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 10px;
    flex-wrap: wrap;
}
</style>
<template>
    <div class="header">
        <form action="" v-if="edit">
            <input type="text" v-model="currentTitulo" class="input" />
        </form>
        <span @click="edit = !edit" v-else class="title">{{ props.task.titulo }}</span>
        <span class="status">{{ props.task.status }}</span>
        <button @click="handleEdit()">Editar</button>
    </div>
</template>
<script setup>
import { defineProps, ref, defineEmits } from 'vue';

const props = defineProps(['task'])
const emits = defineEmits(['update'])

const currentTask = ref(props.task);
const currentTitulo = ref(props.task.titulo);

const edit = ref(false);

const handleEdit = () => {
    edit.value = !edit.value;

    const newTask = {
        id: currentTask.value.id,
        titulo: currentTitulo.value,
        status: 'ATUALIZADA'
    }
    emits('update', newTask);
}

</script>

<style scoped>
div {
    min-width: 200px;
    background-color: lightblue;
    margin-top: 20px;
}

.row {
    display: flex;
}

.header {
    height: 100%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}

.title {
    width: 100%;
    font-size: 32px;
    text-align: center;
    background-color: white;
    margin: 10px;
}

.status {
    width: 100%;
    font-size: 16px;
    text-align: center;
}

.input {
    margin-top: 10px;
    height: 32px;
}
</style>
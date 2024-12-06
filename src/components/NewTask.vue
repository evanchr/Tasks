<script setup lang="ts">
import { ref } from 'vue'

interface Task {
  title: string
  description: string
  date: string
}

const props = defineProps<{
  tasks: Task[]
}>()

const newTask = ref<Task>({
  title: '',
  description: '',
  date: new Date().toISOString().split('T')[0],
})

const emit = defineEmits(['add-task'])

function addTask() {
  if (newTask.value.title.trim()) {
    emit('add-task', { ...newTask.value })
    newTask.value = {
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
    }
  } else {
    alert('Le titre est obligatoire.')
  }
}
</script>

<template>
  <form class="form" @submit.prevent="addTask">
    <h2 class="form-title">Ajouter une tâche</h2>
    <div class="form-group">
      <label for="title">Titre :</label>
      <input
        id="title"
        v-model="newTask.title"
        type="text"
        placeholder="Entrez le titre"
        required
      />
    </div>
    <div class="form-group">
      <label for="description">Description :</label>
      <textarea
        id="description"
        v-model="newTask.description"
        placeholder="Entrez la description"
      ></textarea>
    </div>
    <div class="form-group">
      <label for="date">Date :</label>
      <input id="date" v-model="newTask.date" type="date" />
    </div>
    <button class="form-button" type="submit">Ajouter la tâche</button>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-title {
  text-align: center;
  font-size: 1.5rem;
  color: #ffffff;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-button {
  padding: 10px;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}

.form-button:hover {
  background-color: #0056b3;
}
</style>

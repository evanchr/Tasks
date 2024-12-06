<script setup lang="ts">
import { ref, computed } from 'vue'
import TodoComponent from './TodoComponent.vue'
import NewTask from './NewTask.vue'

interface Task {
  title: string
  description: string
  date: string
  etat: string
}

const items = ref<Task[]>([
  {
    title: 'Finir les cours',
    description: "Vite parce que wallah j'en peux plus",
    date: '2024-11-28',
    etat: 'à faire',
  },
  {
    title: 'Aller à la patinoire',
    description: 'Sortie entre potes',
    date: '2024-11-28',
    etat: 'à faire',
  },
  {
    title: 'Aller au bar',
    description: 'Objectif ne jamais en sortir',
    date: '2024-11-28',
    etat: 'terminée',
  },
])

function handleAddTask(newTask: Task) {
  items.value.push({
    ...newTask,
    etat: 'à faire',
  })
}

const remainingTasksCount = computed(() =>
  items.value.filter(task => task.etat === 'à faire').length
)
</script>

<template>
  <div class="todos-container">
    <h1 class="title">Liste des tâches</h1>

    <div class="tasks-wrapper">
      <section class="new-task-section">
        <NewTask :tasks="items" @add-task="handleAddTask" />
      </section>

      <section class="tasks-section">
        <TodoComponent :tasks="items" />
      </section>
    </div>

    <footer class="footer">
      <span>{{ remainingTasksCount }} tâche(s) restante(s) à faire</span>
    </footer>
  </div>
</template>

<style scoped>
.todos-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.title {
  text-align: center;
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 20px;
}

.tasks-wrapper {
  display: flex;
  gap: 20px;
}

.new-task-section {
  flex: 1;
  padding: 20px;
  background: #2c2c2c;
  border-radius: 8px;
}

.tasks-section {
  flex: 2;
  padding: 20px;
  background: #2c2c2c;
  border-radius: 8px;
}

.footer {
  margin-top: 20px;
  text-align: center;
  color: #ffffff;
  background-color: #2c2c2c;
  padding: 10px;
  border-radius: 8px;
  font-size: 1rem;
}
</style>

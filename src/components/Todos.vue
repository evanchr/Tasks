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

const items = ref<Task[]>([])

const currentFilter = ref<'all' | 'todo' | 'done'>('all')

const filteredTasks = computed(() => {
  switch (currentFilter.value) {
    case 'todo':
      return items.value.filter((task) => task.etat === 'à faire')
    case 'done':
      return items.value.filter((task) => task.etat === 'terminée')
    default:
      return items.value
  }
})

function setFilter(filter: 'all' | 'todo' | 'done') {
  currentFilter.value = filter
}

function deleteAllTasks() {
  items.value.splice(0, items.value.length)
}

function deleteCompletedTasks() {
  items.value = items.value.filter((task) => task.etat !== 'terminée')
}

function handleAddTask(newTask: Task) {
  items.value.push({
    ...newTask,
    etat: 'à faire',
  })
}

function handleUpdateTaskStatus(index: number, etat: string) {
  const taskIndex = items.value.findIndex((_, i) => i === index)
  if (taskIndex !== -1) {
    items.value[taskIndex].etat = etat
  }
}

function handleUpdateTaskTitle(index: number, newTitle: string) {
  const taskIndex = items.value.findIndex((_, i) => i === index)
  if (taskIndex !== -1) {
    items.value[taskIndex].title = newTitle
  }
}

const nbTachesRestantes = computed(
  () => items.value.filter((task) => task.etat === 'à faire').length,
)
</script>

<template>
  <div class="todos-container">
    <h1 class="title">Liste des tâches</h1>

    <div class="filters">
      <button :class="{ active: currentFilter === 'all' }" @click="setFilter('all')">
        Toutes les tâches
      </button>
      <button :class="{ active: currentFilter === 'todo' }" @click="setFilter('todo')">
        Tâches à faire
      </button>
      <button :class="{ active: currentFilter === 'done' }" @click="setFilter('done')">
        Tâches faites
      </button>
    </div>

    <div class="tasks-wrapper">
      <section class="new-task-section">
        <NewTask :tasks="items" @add-task="handleAddTask" />
      </section>

      <section class="tasks-section">
        <TodoComponent
          :tasks="filteredTasks"
          @update-task-status="handleUpdateTaskStatus"
          @update-task-title="handleUpdateTaskTitle"
        />
      </section>
    </div>

    <footer v-show="nbTachesRestantes > 0" class="footer">
      <button class="delete-all" @click="deleteAllTasks">Supprimer tout</button>
      <button class="delete-all" @click="deleteCompletedTasks">Supprimer les terminées</button>
      <span>{{ nbTachesRestantes }} tâche(s) restante(s) à faire</span>
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

.filters {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.filters button {
  padding: 10px 15px;
  background: #2c2c2c;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.filters button.active {
  background: #007bff;
  font-weight: bold;
}

.filters button:hover {
  background: #1a1a1a;
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

.delete-all {
  padding: 10px 15px;
  margin-right: 10px;
  background: #ff0000;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.delete-all:hover {
  background: #cc0000;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  tasks: Array as PropType<
    {
      title: string
      description: string
      date: string
      etat: string
    }[]
  >,
})

const emits = defineEmits(['update-task-status', 'update-task-title'])

const editingIndex = ref<number | null>(null)
const newTitle = ref<string>('')

function startEditing(index: number, currentTitle: string) {
  editingIndex.value = index
  newTitle.value = currentTitle
}

function stopEditing(index: number) {
  if (editingIndex.value !== null && newTitle.value.trim()) {
    emits('update-task-title', index, newTitle.value.trim())
  }
  editingIndex.value = null
}

function handleKeyDown(event: KeyboardEvent, index: number) {
  if (event.key === 'Enter') {
    stopEditing(index)
  } else if (event.key === 'Escape') {
    editingIndex.value = null
  }
}

function toggleTaskStatus(index: number, isCompleted: boolean) {
  emits('update-task-status', index, isCompleted ? 'terminée' : 'à faire')
}
</script>

<template>
  <ul class="task-list">
    <li v-for="(task, index) in tasks" :key="index" class="task-item">
      <div class="task-content">
        <label class="checkbox-container">
          <input
            type="checkbox"
            :checked="task.etat === 'terminée'"
            @change="(event) => toggleTaskStatus(index, (event.target as HTMLInputElement).checked)"
          />
          <span class="custom-checkbox"></span>
        </label>
        <span
          v-if="editingIndex !== index"
          class="task-title"
          @dblclick="startEditing(index, task.title)"
          :class="{ completed: task.etat === 'terminée' }"
        >
          {{ task.title }}
        </span>
        <input
          v-else
          v-model="newTitle"
          @blur="stopEditing(index)"
          @keydown="handleKeyDown($event, index)"
          class="edit-input"
          type="text"
        />
      </div>
      <p class="task-description">{{ task.description }}</p>
      <p class="task-date">{{ task.date }}</p>
    </li>
  </ul>
</template>

<style scoped>
.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 15px;
  padding: 10px;
  background: #2c2c2c;
  border-radius: 8px;
}

.task-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.checkbox-container {
  position: relative;
  display: flex;
  align-items: center;
}

.checkbox-container input[type='checkbox'] {
  opacity: 0;
  width: 0;
  height: 0;
}

.custom-checkbox {
  width: 20px;
  height: 20px;
  background-color: #ffffff;
  border: 2px solid #007bff;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.checkbox-container input[type='checkbox']:checked + .custom-checkbox {
  background-color: #007bff;
  border-color: #0056b3;
}

.checkbox-container input[type='checkbox']:checked + .custom-checkbox::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  width: 10px;
  height: 10px;
  background-color: #ffffff;
  border-radius: 50%;
}

.task-title {
  font-size: 1rem;
  cursor: pointer;
}

.task-title.completed {
  text-decoration: line-through;
  color: #6c757d;
}

.edit-input {
  font-size: 1rem;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

.task-description,
.task-date {
  font-size: 0.9rem;
  color: #aaa;
}
</style>

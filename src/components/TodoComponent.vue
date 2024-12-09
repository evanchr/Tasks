<script setup lang="ts">
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

const emits = defineEmits(['update-task-status'])

function updateTaskStatus(index: number, etat: string) {
  emits('update-task-status', index, etat)
}
</script>

<template>
  <ul>
    <li v-for="(task, index) in tasks" :key="index">
      <label>
        <input
          type="checkbox"
          :checked="task.etat === 'terminée'"
          @change="
            (event) => {
              const target = event.target as HTMLInputElement | null
              if (target) {
                updateTaskStatus(index, target.checked ? 'terminée' : 'à faire')
              }
            }
          "
        />
        <span :class="{ completed: task.etat === 'terminée' }">{{ task.title }}</span>
      </label>
      <p>{{ task.description }}</p>
      <p>{{ task.date }}</p>
    </li>
  </ul>
</template>

<style scoped>
.completed {
  text-decoration: line-through;
  color: #6c757d; /* Gris clair */
}
</style>

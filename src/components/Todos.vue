<script setup lang="ts">
import { ref } from 'vue'
import TodoComponent from './TodoComponent.vue'

const items = ref([
  {
    title: 'Finir les cours',
    description: "Vite parce que wallah j'en peux plus",
    date: '2024-11-28',
  },
  { title: 'Aller à la patinoire', description: 'Sortie entre potes', date: '2024-11-28' },
  { title: 'Aller au bar', description: 'Objectif ne jamais en sortir', date: '2024-11-28' },
])
</script>

<template>
  <h1>Todos</h1>
  <TodoComponent :tasks="items" />
</template>

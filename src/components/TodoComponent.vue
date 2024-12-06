<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  tasks: Array as PropType<{ title: string; description: string; date: string, etat:string }[]>,
})
</script>

<template>
  <ul>
    <li v-for="(task, index) in tasks" :key="index">
      <h4>{{ task.title }}</h4>
      <p>{{ task.description }}</p>
      <p>{{ task.date }}</p>
      <p>Statut : {{ task.etat }}</p>
    </li>
  </ul>
</template>

<template>
  <div class="navigation fixed inset-y-0 right-0 w-1/3 overflow-y-auto p-8">
    <div v-for="item in menuItems" :key="item" class="text-white text-9xl mb-4 cursor-pointer transform -skew-y-6">
      {{ item }}
    </div>
  </div>
</template>
<script setup lang="ts">
const menuItems = ref(["Boids", "Project 2", "Project 3", "Project 4"]);
</script>

<style scoped>
/* https://fonts.google.com/?preview.text=TEST */
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

.navigation {
  font-family: 'Bebas Neue', cursive;
}
</style>
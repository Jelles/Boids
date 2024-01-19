<template>
  <div>
    <NuxtLayout>
      <Navbar />
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import '@/assets/css/tailwind.css'
import Navbar from "assets/js/components/navbar/Navbar.vue";
</script>
<template>
  <UContainer class="mt-10">
    <Swarm/>
    <SwarmSettings/>
  </UContainer>
</template>
<script setup lang="ts">
import '@/assets/css/tailwind.css'
import Swarm from "~/assets/js/components/Swarm.vue";
import SwarmSettings from "assets/js/components/SwarmSettings.vue";
</script>
<template>
    <div class="grid grid-cols-2">
      <Swarm/>
      <SwarmV2/>
    </div>
</template>
<script setup lang="ts">
import '@/assets/css/tailwind.css'
import Swarm from "assets/js/components/boids/Swarm.vue";
import SwarmV2 from "assets/js/components/boidsv2/SwarmV2.vue";
</script>
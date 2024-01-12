<template>
  <UDivider class="m-4 pt-12">
    <span class="text-5xl">Flocking Simulation</span>
  </UDivider>
  <div class="grid grid-cols-2">
    <Swarm :amount="5" :bounds="{width: 500, height: 500}"/>
    <SwarmV2 :amount="5" :bounds="{width: 500, height: 500}"/>
  </div>
</template>
<script setup lang="ts">
import Swarm from "assets/js/components/boids/Swarm.vue";
import SwarmV2 from "assets/js/components/boids/SwarmCanvas.vue";
</script>
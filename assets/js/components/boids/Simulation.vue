<template>
  <div class="flex flex-row justify-center">
    <Swarm :amount="5" :bounds="{width: 500, height: 500}"/>
    <SwarmV2 :amount="5" :bounds="{width: 500, height: 500}"/>
  </div>
</template>
<script setup lang="ts">
import Swarm from "assets/js/components/boids/Swarm.vue";
import SwarmV2 from "assets/js/components/boids/SwarmCanvas.vue";
</script>
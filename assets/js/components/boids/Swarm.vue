<script setup lang="ts">

import {onMounted, ref, watch} from "vue";
import BoidComponent from "assets/js/components/boids/Boid.vue";
import {Boid} from "assets/js/types/Boid";
import SwarmSettings from "assets/js/components/boids/SwarmSettings.vue";
import type { PropType } from 'vue'

const boids = ref<Boid[]>([]);
const computedBoids = computed(() => boids.value);

const props = defineProps({
  amount: {
    type: Number,
    required: true
  },
  bounds: {
    type: Object as PropType<{ width: number, height: number }>,
    required: true
  }
});

onMounted(() => {
  for (let i = 0; i < props.amount; i++) {
    boids.value.push(new Boid(props.bounds));
  }

  const updateBoids = setInterval(() => {
    computedBoids.value.forEach(boid => boid.update(props.bounds, computedBoids.value as Boid[]));
  }, 1000 / 120);

  // on mouse click, add a new boid
  window.addEventListener('click', (e) => {
    const boid = new Boid(props.bounds);
    boid.setPos(e.offsetX, e.offsetY);
    boids.value.push(boid);
  });

  onUnmounted(() => {
    clearInterval(updateBoids);
  });
});

</script>

<template>
  <div class="flex flex-col items-center justify-center pt-12">
    <div class="justify-center">
      <UDivider class="m-4">
        <span class="text-2xl">HTML Swarm</span>
      </UDivider>
    </div>
    <div class="bg-white border-2 border-black" :style="`width: ${bounds.width}px; height: ${bounds.height}px;`">
      <BoidComponent v-for="(boid, index) in computedBoids" :key="index" :boid="boid as Boid"/>
    </div>
    <SwarmSettings :boids="computedBoids"/>
  </div>
</template>

<style scoped>

</style>
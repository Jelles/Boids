<script setup lang="ts">

import {onMounted, ref, watch} from "vue";
import BoidComponent from "assets/js/components/boids/Boid.vue";
import {Boid} from "assets/js/types/Boid";
import {Vector} from "assets/js/types/Vector";
import SwarmSettings from "assets/js/components/boids/SwarmSettings.vue";
import {getGlobalThis} from "@vue/shared";

const boids = ref<Boid[]>([]);
const computedBoids = computed(() => boids.value);

const cohesion = ref(45);
const alignment = ref(55);
const separation = ref(25);
const bounds = ref({
  width: 500,
  height: 500,
});

const target = new Vector(0, 0)

onMounted(() => {
  for (let i = 0; i < 10; i++) {
    boids.value.push(new Boid());
  }

  const updateBoids = setInterval(() => {
    computedBoids.value.forEach(boid => boid.update(bounds.value, computedBoids.value as Boid[]));
  }, 1000 / 120);

  // save mouse position as target
  const mouseMoveHandler = (event: any) => {
    target.x = event.clientX;
    target.y = event.clientY;
  };

  window.addEventListener('mousemove', mouseMoveHandler);

  onUnmounted(() => {
    clearInterval(updateBoids);
    window.removeEventListener('mousemove', mouseMoveHandler);
  });

  const globalThis = getGlobalThis();

  globalThis.bounds = bounds;
  globalThis.cohesion = ref(cohesion);
  globalThis.alignment = ref(alignment);
  globalThis.separation = ref(separation);
});

watch([cohesion, alignment, separation], () => {
  for (let i = 0; i < computedBoids.value.length; i++) {
    computedBoids.value[i].desiredCohesion = cohesion.value;
    computedBoids.value[i].desiredAlignment = alignment.value;
    computedBoids.value[i].desiredSeparation = separation.value;
  }
});

</script>

<template>
  <div class="flex flex-col items-center justify-center pt-12">
    <div class="bg-white border-2 border-black" :style="`width: ${bounds.width}px; height: ${bounds.height}px;`">
      <BoidComponent v-for="(boid, index) in computedBoids" :key="index" :boid="boid as Boid"/>
    </div>
    <SwarmSettings :boids="computedBoids"/>
  </div>
</template>

<style scoped>

</style>
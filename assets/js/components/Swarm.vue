<script setup lang="ts">

import {onMounted, ref} from "vue";
import BoidComponent from "~/assets/js/components/Boid.vue";
import {Boid} from "assets/js/types/Boid";
import {Vector} from "assets/js/types/Vector";
import SwarmSettings from "assets/js/components/SwarmSettings.vue";

const boids = ref<Boid[]>([]);
const computedBoids = computed(() => boids.value);

const bounds = {
  width: 500,
  height: 500,
}

const target = new Vector(0, 0)
onMounted(() => {
  for (let i = 0; i < 10; i++) {
    boids.value.push(new Boid());
  }


  setInterval(update, 1000 / 120);

  // save mouse position as target
  window.addEventListener('mousemove', (event) => {
    target.x = event.clientX;
    target.y = event.clientY;
  });
});

const update = () => {
  console.log("Seperation: " + computedBoids.value[0].desiredSeparation)
  console.log("Alignment: " + computedBoids.value[0].desiredAlignment)
  console.log("Cohesion: " + computedBoids.value[0].desiredCohesion)
  for (let i = 0; i < computedBoids.value.length; i++) {
    computedBoids.value[i].update(bounds, computedBoids.value as Boid[]);
  }
};

</script>

<template>
  <div class="flex justify-center">
    <div class="bg-white border-2 border-black" :style="`width: ${bounds.width}px; height: ${bounds.height}px;`">
      <BoidComponent v-for="(boid, index) in computedBoids" :key="index" :boid="boid as Boid"/>
    </div>
  </div>
  <SwarmSettings :boids="computedBoids"/>
</template>

<style scoped>
</style>
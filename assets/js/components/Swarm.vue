<script setup lang="ts">

import {onMounted, ref} from "vue";
import BoidComponent from "~/assets/js/components/Boid.vue";
import {Boid} from "assets/js/types/Boid";
import {Vector} from "assets/js/types/Vector";

const boids = ref<Boid[]>([]);
const computedBoids = computed(() => boids.value);
const bounds = {
  width: 2000,
  height: 800,
}

const target = new Vector(0, 0)
onMounted(() => {
  for (let i = 0; i < 10; i++) {
    boids.value.push(new Boid());
  }

  setInterval(update, 1000 / 60);

  // save mouse position as target
  window.addEventListener('mousemove', (event) => {
    target.x = event.clientX;
    target.y = event.clientY;
  });
});

const update = () => {
  for (let i = 0; i < computedBoids.value.length; i++) {
    console.log(computedBoids.value[i].position.x, computedBoids.value[i].position.y);
    computedBoids.value[i].update(bounds, computedBoids.value as Boid[]);
  }
};

</script>

<template>
  <div class="swarm">
    <BoidComponent v-for="(boid, index) in computedBoids" :key="index"  :boid="boid"/>
  </div>
</template>

<style scoped>
.swarm {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #f0f0f0; /* or any background color you prefer */
}
</style>
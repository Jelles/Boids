<script setup lang="ts">

import {onMounted, ref} from "vue";
import {Boid} from "assets/js/types/Boid";
import {Vector} from "assets/js/types/Vector";
import SwarmSettings from "assets/js/components/boids/SwarmSettings.vue";

const boids = ref<Boid[]>([]);
const target = new Vector(0, 0);
const canvas = ref<HTMLCanvasElement>();
let ctx: CanvasRenderingContext2D | null;

const bounds = {
  width: 500,
  height: 500,
}

onMounted(() => {
  for (let i = 0; i < 10; i++) {
    boids.value.push(new Boid());
  }

  canvas.value = document.querySelector('canvas') as HTMLCanvasElement;
  canvas.value.width = bounds.width;
  canvas.value.height = bounds.height;

  ctx = canvas.value.getContext('2d');


  const updateBoids = setInterval(() => {
    boids.value.forEach(boid => boid.update(bounds, boids.value as Boid[]));
  }, 1000 / 120);

  const mouseMoveHandler = (event: any) => {
    target.x = event.clientX;
    target.y = event.clientY;
  };

  window.addEventListener('mousemove', mouseMoveHandler);

  onUnmounted(() => {
    clearInterval(updateBoids);
    window.removeEventListener('mousemove', mouseMoveHandler);
  });

  // log the size of the ctx to the console
  console.log(ctx);
  console.log(canvas.value)

  drawBoids();
});



const drawBoids = () => {
  ctx?.clearRect(0, 0, bounds.width, bounds.height);
  boids.value.forEach(boid => boid.draw(ctx as CanvasRenderingContext2D));

  requestAnimationFrame(drawBoids);
}


</script>

<template>
  <div class="flex flex-col items-center justify-center pt-12">
    <canvas ref="canvas" class="bg-white border-2 border-black" :style="`width: ${bounds.width}px; height: ${bounds.height}px;`"></canvas>
    <SwarmSettings :boids="boids"/>
  </div>
</template>

<style scoped>

</style>
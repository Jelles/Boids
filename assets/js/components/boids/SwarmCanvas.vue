<script setup lang="ts">

import {onMounted, ref} from "vue";
import {Boid} from "assets/js/types/Boid";
import SwarmSettings from "assets/js/components/boids/SwarmSettings.vue";
import type { PropType } from 'vue'

const boids = ref<Boid[]>([]);
const canvas = ref<HTMLCanvasElement>();
let ctx: CanvasRenderingContext2D | null;

const props = defineProps({
  amount: {
    type: Number,
    required: true
  },
  bounds: {
    type: Object as PropType<{ width: number, height: number }>,
    required: true
  },
});

onMounted(() => {
  for (let i = 0; i < props.amount; i++) {
    boids.value.push(new Boid(props.bounds));
  }

  canvas.value = document.querySelector('canvas') as HTMLCanvasElement;
  canvas.value.width = props.bounds.width;
  canvas.value.height = props.bounds.height;

  ctx = canvas.value.getContext('2d');


  const updateBoids = setInterval(() => {
    boids.value.forEach(boid => boid.update(props.bounds, boids.value as Boid[]));
  }, 1000 / 120);

  canvas.value.addEventListener('click', (e) => {
    const boid = new Boid(props.bounds);
    boid.setPos(e.offsetX, e.offsetY);
    boids.value.push(boid);
  });

  onUnmounted(() => {
    clearInterval(updateBoids);
  });

  drawBoids();
});



const drawBoids = () => {
  ctx?.clearRect(0, 0, props.bounds.width, props.bounds.height);
  boids.value.forEach(boid => boid.draw(ctx as CanvasRenderingContext2D, true));

  requestAnimationFrame(drawBoids);
}


</script>

<template>
  <div class="flex flex-col items-center justify-center pt-12">
    <div class="justify-center">
      <UDivider class="m-4">
        <span class="text-2xl">Canvas Swarm</span>
      </UDivider>
    </div>
    <canvas ref="canvas" class="bg-white border-2 border-black" :style="`width: ${bounds.width}px; height: ${bounds.height}px;`"></canvas>
    <SwarmSettings :boids="boids"/>
  </div>
</template>

<style scoped>

</style>
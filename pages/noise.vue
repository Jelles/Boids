
<script setup lang="ts">
import {onMounted} from "vue";
let canvas:HTMLCanvasElement | null = null;
let ctx:CanvasRenderingContext2D | null = null;

var t = 0;

const draw = () => {
  var n = noise(t);
  println(n);
  // Move forward in time
  t += 0.01;
};

const canvasSize = 500;
onMounted(() => {
  canvas = document.getElementById('noiseCanvas') as HTMLCanvasElement;
  ctx = canvas?.getContext('2d') as CanvasRenderingContext2D;
});

</script>

<template>
  <div>
    <canvas id="noiseCanvas" width="500" height="500" class="bg-white"></canvas>
  </div>
</template>


<style scoped>

</style>
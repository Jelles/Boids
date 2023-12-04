<script setup lang="ts">
import {onMounted } from "vue";
import {Boid} from "assets/js/types/Boid";

const props = defineProps({
  boid: {
    type: Boid,
    required: true
  }
});

const boid = ref<Boid>(props.boid);
const position = computed(() => boid.value.position);
onMounted(() => {
// change rotation based on velocity
//   watch(() => boid.value.velocity, () => {
//     boid.value.rotation = Math.atan2(boid.value.velocity.y, boid.value.velocity.x) * 180 / Math.PI;
//   });
});
</script>

<template>
  <svg :style="{ transform: 'translate(' + position.x + 'px, ' + position.y + 'px) rotate(' + boid.rotation + 'deg)' }" width="20" height="30" xmlns="http://www.w3.org/2000/svg">
    <polygon points="0,0 20,0 10,20" stroke="black" stroke-width="2" fill="none" />
  </svg>
</template>

<style scoped>
.boid {
  position: absolute;
  transform-origin: center;
}
</style>
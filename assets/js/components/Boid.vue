<script setup lang="ts">
import {Boid} from "assets/js/types/Boid";

const props = defineProps({
  boid: {
    type: Boid,
    required: true
  }
});

const boid = ref<Boid>(props.boid);
const position = computed(() => boid.value.position);

</script>

<template>
  <svg :style="{ transform: 'translate(' + position.x + 'px, ' + position.y + 'px) rotate(' + boid.rotation + 'deg)' }" class="boid" width="20" height="30" xmlns="http://www.w3.org/2000/svg">
    <polygon points="0,0 20,0 10,20" stroke="black" stroke-width="2" fill="none" />
  </svg>
</template>

<style scoped>
.boid {
  position: absolute;
  transform-origin: center;
}
</style>
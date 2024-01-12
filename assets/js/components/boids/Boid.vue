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
const x = computed(() => position.value.x - Boid.BOID_SIZE / 2);
const y = computed(() => position.value.y - Boid.BOID_SIZE / 2);
</script>

<template>
  <svg class="absolute" :style="{ transform: 'translate(' + x + 'px, ' + y + 'px) rotate(' + boid.angle + 'deg)' }" xmlns="http://www.w3.org/2000/svg" :width="Boid.BOID_SIZE" :height="Boid.BOID_SIZE" viewBox="0 0 1280.000000 1280.000000" preserveAspectRatio="xMidYMid meet">
    <path transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" fill="#000000" d="M299 12786 c-120 -35 -207 -110 -263 -226 -28 -59 -31 -73 -30 -160 0 -79 5 -104 26 -150 13 -30 894 -1359 1956 -2953 l1932 -2897 -1932 -2897 c-1062 -1594 -1943 -2923 -1957 -2953 -21 -47 -25 -70 -25 -150 0 -86 3 -101 30 -160 17 -36 50 -86 72 -111 79 -88 223 -140 347 -124 51 6 811 383 6125 3040 5803 2901 6069 3036 6110 3082 56 63 98 154 106 229 13 121 -39 260 -125 336 -35 31 -1509 772 -6106 3070 l-6060 3030 -80 4 c-48 2 -98 -2 -126 -10z"/>
  </svg>
</template>
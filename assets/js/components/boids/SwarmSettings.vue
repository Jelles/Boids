<script setup lang="ts">
import type {Boid} from "assets/js/types/Boid";
import {getGlobalThis} from "@vue/shared";
import type {PropType} from "vue";
import type {UnwrapRefSimple} from "@vue/reactivity";

const props = defineProps({
  boids: {
    type: Array<UnwrapRefSimple<Boid>>,
    required: true
  }
});

const cohesion = ref(5);
const alignment = ref(50);
const separation = ref(25);

watch([cohesion, alignment, separation], () => {
  for (let i = 0; i < props.boids.length; i++) {
    props.boids[i].desiredCohesion = cohesion.value;
    props.boids[i].desiredAlignment = alignment.value;
    props.boids[i].desiredSeparation = separation.value;
  }
});
</script>

<template>
  <div class="w-1/2">
    <div class="justify-center">
      <UDivider class="m-4">
        <span class="text-2xl">Swarm Settings</span>
      </UDivider>
    </div>
    <div class="justify-center">
      <div class="">
        <UCard class="mr-4">
          <div class="mt-2">
            <label class="text-xl">Separation</label>
            <URange v-model="separation" :min="0" :max="100" :step="1"/>
          </div>
          <div class="mt-2">
            <label class="text-xl">Alignment</label>
            <URange v-model="alignment" :min="0" :max="100" :step="1"/>
          </div>
          <div class="mt-2">
            <label class="text-xl">Cohesion</label>
            <URange v-model="cohesion" :min="0" :max="100" :step="1"/>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
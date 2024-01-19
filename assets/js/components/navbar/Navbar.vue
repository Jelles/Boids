<template>
  <div v-if="!navbar" class="p-4">
    <UButton color="gray" @click="showNav">
      <template #trailing>
        <UIcon name="i-heroicons-bars-3 p-3" />
      </template>
    </UButton>
  </div>

  <div v-if="navbar" class="navigation fixed inset-y-0 pt-4">
    <UVerticalNavigation :links="links" />
  </div>
</template>
<script setup lang="ts">
import type {VerticalNavigationLink} from "#ui/types";

const navbar = ref(false);

const links:VerticalNavigationLink[] = [
  {
    label: "Home",
    icon: "i-heroicons-home",
    to: "/",
  },
  {
    label: "Boids Flocking",
    icon: "i-heroicons-home",
    to: "/boids",
  },
  {
    label: "Fluid Simulation",
    icon: "i-heroicons-home",
    to: "/fluid",
  },
];

const showNav = () => {
  navbar.value = !navbar.value;
};

</script>

<style scoped>
</style>
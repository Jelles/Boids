<script setup lang="ts">

</script>

<template>
  <div class="flex justify-center">
    <UDivider class="m-4 w-1/2">
      <span class="text-2xl">Swarm Settings</span>
    </UDivider>
  </div>
  <div class="flex justify-center">
    <div class="w-1/2">
      <UCard class="mr-4">
        <div class="mt-2">
          <label class="text-xl">Separation</label>
          <URange :min="0" :max="100" :step="1"/>
        </div>
        <div class="mt-2">
          <label class="text-xl">Alignment</label>
          <URange :min="0" :max="100" :step="1"/>
        </div>
        <div class="mt-2">
          <label class="text-xl">Cohesion</label>
          <URange :min="0" :max="100" :step="1"/>
        </div>
      </UCard>
    </div>
  </div>
</template>

<style scoped>
</style>
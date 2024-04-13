<script setup lang="ts">
// setup属性
// 言語指定　lang

const widthInit = Math.round(Math.random() * 10);
const heighthInit = Math.round(Math.random() * 10);
const width = ref(widthInit);
const height = ref(heighthInit);
const area = computed(
  (): number => {
    return width.value * height.value;
  }
);
onMounted(
  (): void => {
    if(process.server) return 
    testSetInterval
  }
);
const testSetInterval = (): void => {
    width.value = Math.round(Math.random() * 10);
    height.value = Math.round(Math.random() * 10);
  }

</script>
<template>
  <p>縦{{ height }}で横が{{ width }}の長方形の面積は{{ area }}</p>
</template>

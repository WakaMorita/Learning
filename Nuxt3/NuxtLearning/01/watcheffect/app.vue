<script setup lang="ts">
const priceMsg = ref("価格情報")
const cocktailNo = ref(1)
watchEffect(
  (): void => {
    priceMsg.value = getCocktailInfo(cocktailNo.value)
  }
)
</script>
<template>
</template>
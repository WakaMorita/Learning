<script setup lang="ts">
const msg = ref("まだ")
const onButtonClick = (label: string, event: Event): void => {
  const target = event.target as HTMLButtonElement;
  const text = target.innerText;
  msg.value = `${label}と${text}`;
};
</script>
<template>
  <p>{{ msg }}</p>
  <button v-on:click="onButtonClick('Hello',$event)">こんにちわ</button>
</template>
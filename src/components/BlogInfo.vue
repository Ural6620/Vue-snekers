<script setup>
defineProps({
  title: String,
  discription: String,
  imageUrl: String
})
</script>

<template>
  <div class="flex flex-col text-center items-center w-72 mx-auto">
    <img class="w-28 h-28" :src="imageUrl" :alt="`product ${title[0]}`" />
    <h2 class="mt-4 text-2xl font-medium">{{ title }}</h2>
    <p class="text-gray-400">{{ discription }}</p>
  </div>
</template>

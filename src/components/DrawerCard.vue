<script setup>
const emit = defineEmits('onClickRemove')
defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number
})
</script>

<template>
  <div class="flex gap-4 border border-slate-200 p-4 rounded-xl">
    <img :src="imageUrl" class="w-16" />

    <div class="flex flex-col justify-between flex-1">
      <p class="text-sm">{{ title }}</p>
      <div class="flex justify-between">
        <b class="flex-1">{{ price }} руб.</b>
        <img
          @click="emit('onClickRemove')"
          src="../../public/close.svg"
          class="opacity-40 hover:opacity-100 transform cursor-pointer"
          alt="remove to bag"
        />
      </div>
    </div>
  </div>
</template>

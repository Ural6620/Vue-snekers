<script setup>
defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
  isAdded: Boolean,
  isFavorite: Boolean,
  onclickFavorite: Function,
  onclickAdd: Function
})
</script>

<template>
  <div
    class="relative bg-whites border border-slate-100 rounded-3xl p-8 transition hover:-translate-y-2 hover:shadow-xl"
    :class="isAdded || isFavorite ? 'shadow-xl' : 'shadow-none'"
  >
    <img
      v-if="onclickFavorite"
      :src="!isFavorite ? '../../public/like-1.svg' : '../../public/like-2.svg'"
      class="absolute t-0 l-0 cursor-pointer"
      alt="Like 1"
      @click="onclickFavorite"
    />
    <img :src="imageUrl" :alt="title[0]" />
    <p class="mt-2">{{ title }}</p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="font-semibold uppercase text-gray-500">Цена:</span>
        <b>{{ price }} руб.</b>
      </div>

      <img
        v-if="onclickAdd"
        :src="!isAdded ? '../../public/plus.svg' : '../../public/checked.svg'"
        class="cursor-pointer"
        alt="Add to bag"
        @click="onclickAdd"
      />
    </div>
  </div>
</template>

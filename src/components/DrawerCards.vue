<script setup>
import { inject } from 'vue'
import DrawerCard from './DrawerCard.vue'

const { cart, removeFromCart } = inject('cart')
</script>
<template>
  <div class="flex flex-col gap-5" v-auto-animate>
    <DrawerCard
      v-for="item in cart"
      :key="item.id"
      :title="item.title"
      :price="item.price"
      :image-url="item.imageUrl"
      @on-click-remove="removeFromCart(item)"
    />
  </div>
</template>

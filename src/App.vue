<script setup>
import { ref, provide, watch, computed } from 'vue'

import TheHeader from './components/TheHeader.vue'
import TheDrawer from './components/TheDrawer.vue'

// Korzina(start)
const cart = ref([])
const drawerOpen = ref()

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))
const vatPrice = computed(() => (totalPrice.value * 5) / 100)

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart
})
// Korzina(end)
</script>

<template>
  <TheDrawer :total-price="totalPrice" :vat-price="vatPrice" v-if="drawerOpen" />
  <div class="bg-white w-4/5 mx-auto rounded-xl shadow-xl mt-14">
    <TheHeader :total-price="totalPrice" @open-drawer="openDrawer" />
    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped></style>

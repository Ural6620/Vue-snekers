<script setup>
import { ref, computed, inject } from 'vue'
import axios from 'axios'
import DrawerHead from './DrawerHead.vue'
import DrawerCards from './DrawerCards.vue'
import BlogInfo from './BlogInfo.vue'

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number
})

const { cart } = inject('cart')

const cartIsEmty = computed(() => cart.value.length === 0)
const buttonDisabled = computed(() => isCreatingOrder.value || cartIsEmty.value)

const isCreatingOrder = ref(false)
const orderId = ref(null)

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post('https://28929146004b9838.mokky.dev/orders', {
      items: cart.value,
      totalPrice: props.totalPrice
    })

    cart.value = []
    orderId.value = data.id
  } catch (error) {
    console.log(error)
  } finally {
    isCreatingOrder.value = false
  }
}
</script>
<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class="bg-white w-80 h-full fixed right-0 top-0 z-20 p-8">
    <DrawerHead />

    <div v-if="!totalPrice || orderId" class="flex h-full items-center">
      <BlogInfo
        v-if="!totalPrice && !orderId"
        title="Корзина пустая"
        discription="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
        imageUrl="../../public/package-icon.png"
      />
      <BlogInfo
        v-if="orderId"
        title="Заказ оформлен!"
        :discription="`Ваш заказ #${orderId} скоро будет передан курьерской доставке`"
        imageUrl="../../public/order-success-icon.png"
      />
    </div>

    <div v-else>
      <DrawerCards />

      <div class="flex flex-col gap-4 mb-6">
        <div class="flex gap-2">
          <span>Итого: </span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ totalPrice }} руб. </b>
        </div>
        <div class="flex gap-2">
          <span>Налог 5%: </span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ vatPrice }} руб. </b>
        </div>
        <button
          :disabled="buttonDisabled"
          @click="createOrder"
          class="transition bg-lime-500 w-full rounded-2xl py-3 text-white text-xl disabled:bg-slate-300 hover:bg-lime-600 active:bg-lime-700 cursor-pointer"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>

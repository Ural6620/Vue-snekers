<script setup>
import { ref, reactive, inject, onMounted, watch } from 'vue'
import axios from 'axios'
import debounce from 'lodash.debounce'
import TheBlog from '../components/TheBlog.vue'

const { cart, addToCart, removeFromCart } = inject('cart')

const items = ref([])

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const onclickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const onchangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onchangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value
}, 500)

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        item_id: item.id
      }
      const { data } = await axios.post(`https://28929146004b9838.mokky.dev/favorites`, obj)
      item.favoriteId = data.id
      item.isFavorite = true
    } else {
      await axios.delete(`https://28929146004b9838.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
      item.isFavorite = false
    }
  } catch (err) {
    console.log(err)
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`https://28929146004b9838.mokky.dev/favorites`)
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.item_id === item.id)
      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }
    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }
    const { data } = await axios.get(`https://28929146004b9838.mokky.dev/items`, {
      params
    })
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }))
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []

  await fetchItems()
  await fetchFavorites()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})

watch(filters, fetchItems)
watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})
</script>
<template>
  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>

    <div class="flex gap-5">
      <select @change="onchangeSelect" class="border py-2 px-3 rounded-md outline-none">
        <option value="name">По Названию</option>
        <option value="price">По Цене (дешевие)</option>
        <option value="-price">По Цене (дорогие)</option>
      </select>

      <div class="relative">
        <img
          class="absolute top-3 left-4 cursor-pointer"
          src="../../public/search.svg"
          alt="Search products"
        />
        <input
          @input="onchangeSearchInput"
          class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
          type="text"
          placeholder="Поиск..."
        />
      </div>
    </div>
  </div>

  <div class="mt-10">
    <TheBlog :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onclickAddPlus" />
  </div>
</template>

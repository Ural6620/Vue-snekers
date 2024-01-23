<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import TheBlog from '../components/TheBlog.vue'

const favorites = ref([])
onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://28929146004b9838.mokky.dev/favorites?_relations=items'
    )
    favorites.value = data.map((obj) => obj.item)
  } catch (error) {
    console.log(error)
  }
})
</script>
<template>
  <h2 class="text-3xl font-bold mb-8">Мой Закладки</h2>
  <TheBlog :items="favorites" is-favorites />
</template>

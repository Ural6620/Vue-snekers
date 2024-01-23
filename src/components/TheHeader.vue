<script setup>
defineProps({
  totalPrice: Number
})

const emit = defineEmits(['openDrawer'])
</script>

<template>
  <header class="flex justify-between border-b border-slate-200 px-10 py-8">
    <router-link to="/">
      <div class="flex items-center gap-4">
        <img src="../../public/logo.png" class="w-10" alt="Logo image" />
        <div>
          <h2 class="text-xl uppercase font-bold">Vue sneakers</h2>
          <p class="text-slate-400">Магазин лучших красовок</p>
        </div>
      </div>
    </router-link>

    <ul class="flex items-center gap-10">
      <li
        @click="() => emit('openDrawer')"
        class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black"
      >
        <img src="../../public/cart.svg" alt="Cart " />
        <b>{{ totalPrice }} руб.</b>
      </li>
      <router-link to="/favorites">
        <li class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black">
          <img src="../../public/heart.svg" alt="Heart " />
          <span>Закладки </span>
        </li>
      </router-link>

      <li class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black">
        <img src="../../public/profile.svg" alt="Profile " />
        <span>Профиль</span>
      </li>
    </ul>
  </header>
</template>

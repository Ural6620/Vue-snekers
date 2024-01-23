import './assets/main.css'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import TheHome from './pages/TheHome.vue'
import TheFavorites from './pages/TheFavorites.vue'


const routes = [
  { path: '/', name: 'Home', component: TheHome },
  { path: '/favorites', name: 'Favorites', component: TheFavorites }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')
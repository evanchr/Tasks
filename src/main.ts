import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')

const defaultBackgroundColor = ''
const defaultText = 'red'

app.directive('background', (el, binding) => {
  console.log(binding.arg)
  el.style.backgroundColor = binding.arg || defaultText
})

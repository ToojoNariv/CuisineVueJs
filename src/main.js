import './assets/main.css';

import { createApp } from 'vue';
import { ref } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from './router';
import PrimeVue from 'primevue/config';

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.use(PrimeVue);

app.mount('#app');

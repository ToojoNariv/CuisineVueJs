import './assets/main.css';

import { createApp } from 'vue';
import { ref } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import Chart from 'primevue/chart';
import ToastService from 'primevue/toastservice';
import VueGtag from "vue-gtag";

const app = createApp(App);
app.use(ToastService);
app.use(ElementPlus);
// app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'light',
            cssLayer: false
        }
    }
});

app.use(VueGtag, {
    config: { id: "G-LJH9BCFB5R" }
  });

app.component('Chart', Chart);
app.mount('#app');

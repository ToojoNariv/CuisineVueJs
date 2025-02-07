import './assets/main.css';

import { createApp } from 'vue';
import { ref } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from './router';
import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
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

app.mount('#app');

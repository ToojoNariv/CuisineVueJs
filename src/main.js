import './assets/main.css';

import { createApp } from 'vue';
import { ref } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from './router';

const app = createApp(App);

const filters = {
    diosezy: ref(''),
    region: ref(''),
    fivondronana: ref(''),
    roles: ref(''),
    paiement: ref(''),
    filtreResults: ref([])
  };

app.provide('filters', filters);
app.use(ElementPlus);
app.use(router);

app.mount('#app');

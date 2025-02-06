<script setup>
import { ref, onMounted } from "vue";
import apiService from '../../servises/apiService';

const products = ref([]);

onMounted(async () => {
  const response = await apiService.get("/recettes");
  products.value = response.data;
});
</script>

<template>
  <div>
    <h2>Liste des Recettes</h2>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.nom }} - {{ product.prix }}Ar
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>
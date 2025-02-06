<script setup>
import { ref, onMounted } from "vue";
import apiService from '../../servises/apiService';

const recettes = ref([]);

onMounted(async () => {
  try {
    const response = await apiService.getRecette();
    recettes.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des recettes:", error);
  }
});
</script>

<template>
  <div>
    <h2>Liste des Recettes</h2>
    <ul>
      <li v-for="product in recettes" :key="product.id">
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
<script setup>
import { ref, onMounted } from "vue";
import apiService from '../../servises/apiService';
import InsertionCard from '../materials/InsertionCard.vue'
import InsertionIngredients from '../materials/InsertionIngredients.vue'
import InsertionRecette from '../materials/InsertionRecette.vue'
import Stat from '../materials/Statistique.vue'

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
    <ul>
      <li v-for="product in recettes" :key="product.id">
        {{ product.nom }} - {{ product.prix }}Ar
      </li>
    </ul>
  </div>
  <div class="row">
    <div class="column">
      <div class="row">
        <h1>Gestion Sakafo</h1>
      </div>

      <InsertionCard/>
    </div>
    <div>
      <InsertionIngredients/>
    </div>
    <div class="column">
      <InsertionRecette/>
      <Stat/>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>
.row
{
  display: flex;
  flex-direction: row;
}
.column
{
  display: flex;
  flex-direction: column;
}
</style>
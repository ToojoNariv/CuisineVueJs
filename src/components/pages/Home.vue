<script setup>
import { ref } from "vue";
import PlatModal from '../modals/Platmodals.vue'
import IngredientModal from '../modals/Ingredientmodals.vue'
import RecetteModal from '../modals/Recettemodals.vue'
import InsertionCard from '../materials/InsertionCard.vue'
import InsertionIngredients from '../materials/InsertionIngredients.vue'
import InsertionRecette from '../materials/InsertionRecette.vue'
import Stat from '../materials/Statistique.vue'

const isPlatModalVisible = ref(false);
const isIngredientModalVisible = ref(false);
const isRecetteModalVisible = ref(false);

const showPlatModal = () => {
  isPlatModalVisible.value = true;
};

const showIngredientModal = () => {
  isIngredientModalVisible.value = true;
};

const showRecetteModal = () => {
  isRecetteModalVisible.value = true;
};

</script>

<template>
  <div class="row">
    <div class="column">
      <div class="row">
        <h1>Gestion Sakafo</h1>
      </div>

      <InsertionCard @click="showPlatModal" />
    </div>
    <div>
      <InsertionIngredients @click="showIngredientModal" />
    </div>
    <div class="column">
      <InsertionRecette @click="showRecetteModal" />
      <Stat />
    </div>
  </div>
  <PlatModal v-model="isPlatModalVisible" />
  <IngredientModal v-model="isIngredientModalVisible" />
  <RecetteModal v-model="isRecetteModalVisible" />
</template>

<script>
export default {
  name: 'Home',
};

</script>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
}
.column {
  display: flex;
  flex-direction: column;
}
</style>

<script setup>
import { ref } from "vue";
import PlatModal from '../modals/Platmodals.vue'
import IngredientModal from '../modals/Ingredientmodals.vue'
import GraphModal from '../modals/Stat.vue'
import RecetteModal from '../modals/Recettemodals.vue'
import InsertionCard from '../materials/InsertionCard.vue'
import InsertionIngredients from '../materials/InsertionIngredients.vue'
import InsertionRecette from '../materials/InsertionRecette.vue'
import Stat from '../materials/Statistique.vue'

const isPlatModalVisible = ref(false);
const isIngredientModalVisible = ref(false);
const isRecetteModalVisible = ref(false);
const isGraphModalVisible = ref(false);

const showPlatModal = () => {
  isPlatModalVisible.value = true;
};

const showIngredientModal = () => {
  isIngredientModalVisible.value = true;
};

const showRecetteModal = () => {
  isRecetteModalVisible.value = true;
};

const showGraphModal = () => {
  isGraphModalVisible.value = true;
};

</script>

<template>
  <div class="row">
    <div class="column">
      <div class="row">
        <h1>Gestion Sakafo</h1>
      </div>

      <InsertionCard class="Card" @click="showPlatModal" />
    </div>
    <div>
      <InsertionIngredients class="Card" @click="showIngredientModal" />
    </div>
    <div class="column">
      <InsertionRecette class="Card" @click="showRecetteModal" />
      <Stat class="Card" @click="showGraphModal"/>
    </div>
  </div>
  <PlatModal v-model="isPlatModalVisible" />
  <IngredientModal v-model="isIngredientModalVisible" />
  <RecetteModal v-model="isRecetteModalVisible" />
  <GraphModal v-model="isGraphModalVisible" />
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
  flex: 1;
  margin: 10px;
}
</style>

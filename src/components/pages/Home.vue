<script setup>
import { ref } from "vue";
import PlatModal from '../modals/Platmodals.vue'
import apiService from '../../servises/apiService';
import InsertionCard from '../materials/InsertionCard.vue'
import InsertionIngredients from '../materials/InsertionIngredients.vue'
import InsertionRecette from '../materials/InsertionRecette.vue'
import Stat from '../materials/Statistique.vue'

const isModalVisible = ref(false);

const showModal = () => {
  isModalVisible.value = true;
}

</script>

<template>
  <div class="row">
    <div class="column">
      <div class="row">
        <h1>Gestion Sakafo</h1>
      </div>

      <InsertionCard @click="showModal" />
    </div>
    <div>
      <InsertionIngredients />
    </div>
    <div class="column">
      <InsertionRecette />
      <Stat />
    </div>
  </div>
  <PlatModal v-model="isModalVisible" />
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

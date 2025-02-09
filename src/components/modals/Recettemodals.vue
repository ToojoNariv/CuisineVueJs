<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import apiService from '../../servises/apiService';
import FloatLabel from 'primevue/floatlabel';
import Button from 'primevue/button';
import InputGroup from 'primevue/inputgroup';
import InputNumber from 'primevue/inputnumber';
import AutoComplete from 'primevue/autocomplete';
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const selectedDish = ref(null); 
const selectedIngredient = ref(null); 
const ingredientQuantity = ref(null); 
const loading = ref(false); 
const filteredDishes = ref([]); 
const filteredIngredients = ref([]);
const toast = useToast(); 

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);
const localVisible = ref(props.modelValue);

// Fonction pour rechercher des plats
const searchDishes = async (event) => {
  if (!event.query.trim()) {
    filteredDishes.value = [];
    return;
  }
  try {
    const response = await apiService.getDishByName(event.query);
    filteredDishes.value = response.data;
  } catch (error) {
    console.error('Erreur lors du chargement des plats', error);
  }
};

// Fonction pour rechercher des ingrédients
const searchIngredients = async (event) => {
  if (!event.query.trim()) {
    filteredIngredients.value = [];
    return;
  }
  try {
    const response = await apiService.getIngredientByName(event.query);
    filteredIngredients.value = response.data;
  } catch (error) {
    console.error('Erreur lors du chargement des ingrédients', error);
  }
};

// Fonction pour créer une recette
const createRecipe = async () => {
  if (!selectedDish.value || !selectedIngredient.value || ingredientQuantity.value === null) {
    toast.add({ severity: 'warn', summary: 'Erreur', detail: 'Veuillez sélectionner un plat, un ingrédient et entrer une quantité.', life: 5000 });
    return;
  }

  loading.value = true;
  try {
    const recipeData = {
      dishId: selectedDish.value.id,
      ingredientId: selectedIngredient.value.id,
      quantity: ingredientQuantity.value
    };

    await apiService.createRecipe(recipeData);

    toast.add({ severity: 'success', summary: 'Recette créée', detail: 'La recette a été créée avec succès.', life: 5000 });
  } catch (error) {
    console.error('Erreur lors de la création de la recette', error);
    toast.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de la création de la recette.', life: 5000 });
  } finally {
    loading.value = false;
  }
};

// Fonction pour fermer la modal
const hideModal = () => {
  emit('update:modelValue', false);
};

// Watcher pour synchroniser la visibilité de la modal
watch(() => props.modelValue, (newVal) => {
  localVisible.value = newVal;
});
</script>

<template>
  <Toast />
  <Dialog v-model:visible="localVisible" modal header="Créer une Recette" :closable="true" @hide="hideModal">
    <div class="card flex flex-wrap justify-center items-end gap-4">
      <!-- Sélection du plat -->
      <InputGroup>
        <FloatLabel variant="on">
          <AutoComplete
            v-model="selectedDish"
            inputId="dish"
            :suggestions="filteredDishes"
            @complete="searchDishes"
            optionLabel="nom"
            forceSelection
          />
          <label for="dish">Cherchez un plat</label>
        </FloatLabel>
      </InputGroup>

      <!-- Sélection de l'ingrédient -->
      <InputGroup>
        <FloatLabel variant="on">
          <AutoComplete
            v-model="selectedIngredient"
            inputId="ingredient"
            :suggestions="filteredIngredients"
            @complete="searchIngredients"
            optionLabel="nom"
            forceSelection
          />
          <label for="ingredient">Cherchez un ingrédient</label>
        </FloatLabel>
      </InputGroup>

      <!-- Quantité de l'ingrédient -->
      <InputGroup>
        <FloatLabel variant="on">
          <InputNumber
            v-model="ingredientQuantity"
            inputId="quantity"
            showButtons
            buttonLayout="horizontal"
            :min="0"
            :max="999"
          />
          <label for="quantity">Quantité</label>
        </FloatLabel>
      </InputGroup>

      <!-- Boutons d'action -->
      <div class="actions">
        <Button type="button" label="Créer" icon="pi pi-check" :loading="loading" @click="createRecipe" />
        <Button label="Annuler" class="p-button-secondary" @click="hideModal" />
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.row {
  display: flex;
  flex-direction: row;
}

label 
{
    z-index:1000;
}

.p-toast {
  z-index: 10001 !important;
}
</style>
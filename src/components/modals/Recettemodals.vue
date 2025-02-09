<script setup>
import { ref, watch } from 'vue';
import apiService from '../../servises/apiService';
import FloatLabel from 'primevue/floatlabel';
import Button from 'primevue/button';
import InputGroup from 'primevue/inputgroup';
import InputNumber from 'primevue/inputnumber';
import AutoComplete from 'primevue/autocomplete';
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

// Références pour les données du formulaire
const selectedDish = ref(null); // Plat sélectionné
const ingredientsList = ref([{ ingredient: null, quantity: null }]); // Liste des ingrédients et quantités
const loading = ref(false); // État de chargement
const filteredDishes = ref([]); // Liste des plats filtrés
const filteredIngredients = ref([]); // Liste des ingrédients filtrés
const toast = useToast(); // Toast pour les notifications

// Props et emits pour la gestion de la modal
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

// Fonction pour ajouter un nouvel ingrédient
const addIngredientField = () => {
  ingredientsList.value.push({ ingredient: null, quantity: null });
};

// Fonction pour créer une recette
const createRecipe = async () => {
  if (!selectedDish.value || ingredientsList.value.some(item => !item.ingredient || item.quantity === null)) {
    toast.add({ severity: 'warn', summary: 'Erreur', detail: 'Veuillez sélectionner un plat et remplir tous les ingrédients.', life: 5000 });
    return;
  }

  loading.value = true;
  try {
    const recipeData = {
      dishId: selectedDish.value.id,
      ingredients: ingredientsList.value.map(item => ({
        ingredientId: item.ingredient.id,
        quantity: item.quantity
      }))
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

      <template v-for="(item, index) in ingredientsList" :key="index">
        <div class="row">
        <InputGroup>
          <FloatLabel variant="on">
            <AutoComplete
              v-model="item.ingredient"
              :inputId="`ingredient-${index}`"
              :suggestions="filteredIngredients"
              @complete="searchIngredients"
              optionLabel="nom"
              forceSelection
            />
            <label :for="`ingredient-${index}`">Cherchez un ingrédient</label>
          </FloatLabel>
        </InputGroup>

        <InputGroup>
          <FloatLabel class="stock" variant="on">
            <InputNumber
              v-model="item.quantity"
              :inputId="`quantity-${index}`"
              showButtons
              buttonLayout="horizontal"
              :min="0"
              :max="999"
            />
            <label :for="`quantity-${index}`">Quantité</label>
          </FloatLabel>
        </InputGroup>
        </div>
      </template>
      

      <div class="actions">
        <Button type="button" label="Créer la recette" icon="pi pi-check" :loading="loading" @click="createRecipe" />
        <Button type="button" label="+ d'ingredients" class="p-button-secondary" @click="addIngredientField" />
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

.stock
{
    margin-left: 1vw !important;
}

.p-inputnumber
{
    width:10vw !important;
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
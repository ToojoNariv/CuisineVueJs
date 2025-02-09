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

const selectedDish = ref(null);
const ingredientsList = ref([{ ingredient: null, quantity: null }]);
const loading = ref(false);
const filteredDishes = ref([]);
const filteredIngredients = ref([]); 
const toast = useToast();

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);
const localVisible = ref(props.modelValue);

const searchDishes = async (event) => {
  if (!event.query.trim()) {
    filteredDishes.value = [];
    return;
  }
  try {
    const response = await apiService.getPlatByName(event.query);
    filteredDishes.value = response.data;
  } catch (error) {
    console.error('Erreur lors du chargement des plats', error);
  }
};

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

const addIngredientField = () => {
  ingredientsList.value.push({ ingredient: null, quantity: null });
};
const removeIngredientField = (index) => {
  ingredientsList.value.splice(index, 1);
};


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

    console.log('Données envoyées :', recipeData);

    await apiService.creeRecette(recipeData);

    toast.add({ severity: 'success', summary: 'Recette créée', detail: 'La recette a été créée avec succès.', life: 5000 });
  } catch (error) {
    console.error('Erreur lors de la création de la recette', error);
    toast.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de la création de la recette.', life: 5000 });
  } finally {
    loading.value = false;
  }
};

const hideModal = () => {
  emit('update:modelValue', false);
};

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
        <div class="row">
            <Button type="button" label="+" class="p-button-secondary" @click="addIngredientField" />
            <Button type="button" label="-" class="p-button-secondary ray" @click="removeIngredientField" />
        </div>
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

.ray
{
    background-color: rgb(255, 58, 58) !important;
    margin-left:0.5vw !important;

}

label 
{
    z-index:1000;
}

.p-toast {
  z-index: 10001 !important;
}
</style>
<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import apiService from '../../servises/apiService';
import FloatLabel from 'primevue/floatlabel';
import Button from 'primevue/button';
import InputGroup from 'primevue/inputgroup';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import FileUpload from 'primevue/fileupload';
import AutoComplete from 'primevue/autocomplete';

import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const nom = ref('');
const photo = ref(null);
const assets = ref(null);
const loading = ref(false);
const filteredIngredients = ref([]);
const stockQuantity = ref(null);
const lesIngredient = ref(null);

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const toast = useToast();

const onPhotoUpload = (event) => {
    photo.value = event.files[0];
};

const onAssetUpload = (event) => {
    assets.value = event.files[0];
};

const load = () => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
    }, 2000);
};
const localVisible = ref(props.modelValue);

watch(() => props.modelValue, (newVal) => {
  localVisible.value = newVal;
});

const hideModal = () => {
  emit('update:modelValue', false);
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

const updateVisibility = (value) => {
  localVisible.value = value;
  emit('update:modelValue', value);
};

const enregistrerIngredient = async () => {
  loading.value = true;

  let formData = new FormData();
  formData.append('nom', nom.value);

  if (photo.value) {
    formData.append('photo', photo.value);
  }

  if (assets.value) {
    formData.append('assets', assets.value);
  }

  try {
    const response = await apiService.insertionIngredient(formData);
    toast.add({ severity: 'success', summary: 'Enregistré avec succès', detail: 'Niditra tsara', life: 5000 });
  } catch (error) {
    console.error('Erreur lors de l’insertion', error);
    toast.add({ severity: 'error', summary: 'Erreur', detail: 'Tsy niditra tsara', life: 5000 });
  } finally {
    setTimeout(() => {
      loading.value = false;
      hideModal();
    }, 2000);
  }
};
</script>

<template>
  <Toast />
  <el-dialog :model-value="localVisible" title="Insertion Ingredient et Stock" modal-class="overide-animation" @update:model-value="updateVisibility" @close="hideModal">
    <div class="card flex flex-wrap justify-center items-end gap-4">
      <InputGroup>
        <FloatLabel variant="on">
          <InputText id="nom" v-model="nom" />
          <label for="nom">Nom de l'Ingrédient</label>
        </FloatLabel>
      </InputGroup>

      <div class="card">
          <FileUpload name="photo" accept="image/*" @select="onPhotoUpload" :maxFileSize="1000000">
              <template #empty>
                  <span>Glissez la photo ici</span>
              </template>
          </FileUpload>
      </div>

      <div class="card">
          <FileUpload name="assets" accept="image/*" @select="onAssetUpload" :maxFileSize="1000000">
              <template #empty>
                  <span>Glissez l'assets ici</span>
              </template>
          </FileUpload>
      </div>

      <div class="actions">
        <Button type="button" label="Enregistrer" icon="pi pi-search" :loading="loading" @click="enregistrerIngredient" />
      </div>

      <h2>Ajouter des stocks</h2>

      <InputGroup>
        <FloatLabel variant="on">
          <AutoComplete v-model="lesIngredient" inputId="ingredient" :suggestions="filteredIngredients" @complete="searchIngredients" field="nom"/>
          <label for="ingredient">Nom de l'Ingrédient</label>
        </FloatLabel>
      </InputGroup>

      <InputGroup>
        <FloatLabel variant="on">
          <InputNumber v-model="stockQuantity" showButtons buttonLayout="horizontal" :min="0" :max="999"/>
          <label for="stock">Quantité en stock</label>
          <template #incrementbuttonicon>
                <span class="pi pi-plus" />
            </template>
            <template #decrementbuttonicon>
                <span class="pi pi-minus" />
            </template>
        </FloatLabel>
      </InputGroup>

      <div class="actions">
        {# <Button type="button" label="Enregistrer" icon="pi pi-search" :loading="loading" @click="enregistrerStock" /> #}
        <Button label="Annuler" class="p-button-secondary" @click="hideModal" />
      </div>
    </div>
  </el-dialog>
</template>

<style scoped>
.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
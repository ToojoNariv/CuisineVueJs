<script setup>
import { ref, watch, onMounted } from 'vue';
import apiService from '../../servises/apiService';
import FloatLabel from 'primevue/floatlabel';
import Button from 'primevue/button';
import InputGroup from 'primevue/inputgroup';
import InputText from 'primevue/inputtext';
import FileUpload from 'primevue/fileupload';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const nomingredient = ref('');
const photo = ref(null);
const assets = ref(null);
const loading = ref(false);

const ingredients = ref([]);

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

// Fonction pour fermer la modale
const hideModal = () => {
  emit('update:modelValue', false);
};

// Fonction pour mettre à jour la visibilité
const updateVisibility = (value) => {
  localVisible.value = value;
  emit('update:modelValue', value);
};

const enregistrerIngredient = async () => {
  loading.value = true;

  let formData = new FormData();
  formData.append('nomingredient', nomingredient.value);

  if (photo.value) {
    formData.append('photo', photo.value);
  }

  if (assets.value) {
    formData.append('assets', assets.value);
  }

  try {
    console.log('URL appelée:', apiService.insertionIngredient());
    const response = await apiService.insertionIngredient(formData);
    toast.add({ severity: 'success', summary: 'Enregistré avec succès', detail: 'Ingrédient ajouté avec succès', life: 5000 });
  } catch (error) {
    console.error('Erreur lors de l’insertion', error);
    toast.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de l’ajout de l’ingrédient', life: 5000 });
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
  <el-dialog :model-value="localVisible" title="Insertion Ingredient" modal-class="overide-animation" @update:model-value="updateVisibility" @close="hideModal">
    <div class="card flex flex-wrap justify-center items-end gap-4">
      <InputGroup>
        <FloatLabel variant="on">
          <InputText id="nomingredient" v-model="nomingredient" />
          <label for="nomingredient">Nom de l'Ingrédient</label>
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
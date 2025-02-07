<template>
  <el-dialog :model-value="localVisible" title="Recette Details" modal-class="overide-animation" width="50rem" @update:model-value="updateVisibility" @close="hideModal">
    <div>
      <InputGroup>
        <InputText id="nom" v-model="nom" />
        <label for="nom">Nom du Plat</label>
      </InputGroup>

      <InputGroup>
        <FloatLabel variant="on">
            <InputNumber v-model="prix" id="prix" mode="currency" currency="USD" locale="en-US"/>
            <label for="prix">Prix (Ar)</label>
        </FloatLabel>
      </InputGroup>

      <InputGroup>
        <InputNumber id="tempsCuisson" v-model="tempsCuisson" />
        <label for="tempsCuisson">Temps de Cuisson (secondes)</label>
      </InputGroup>

      <div class="actions">
        <Button label="Enregistrer" @click="enregistrerPlat" />
        <Button label="Annuler" class="p-button-secondary" @click="hideModal" />
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

// Variable locale pour la gestion de la visibilité
const localVisible = ref(props.modelValue);

// Mettre à jour `localVisible` quand `modelValue` change
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

// Fonction pour enregistrer le plat
const enregistrerPlat = () => {
  console.log({ nom: nom.value, prix: prix.value, tempsCuisson: tempsCuisson.value });
  hideModal();
};

// Champs du formulaire
const nom = ref('');
const prix = ref('');
const tempsCuisson = ref('');
</script>

<style scoped>
.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>

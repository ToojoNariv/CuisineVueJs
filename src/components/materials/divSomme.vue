<script setup>
import { inject, ref, watch } from 'vue';
import apiService from '../../servises/apiService';

const { diosezy, region, fivondronana, roles, paiement } = inject('filters');

const sommeCoti = ref([]);

const fetchSomme = () => {

  const filters = {
    diosezy: diosezy.value,
    region: region.value,
    fivondronana: fivondronana.value,
    roles: roles.value,
    paiement: paiement.value,
  };

  apiService.getSommeFiltre(filters)
    .then(response => {
      sommeCoti.value = response.data;
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données filtrées :', error);
    });
};

watch([diosezy, region, fivondronana, roles, paiement], () => {
  fetchSomme();
}, { immediate: true });

</script>


<template>
  <div class="carte">
    <h3 class="soustitre">Somme des cotisations</h3>
    <div v-for="product in sommeCoti" :key="product.id">
      <p class="montant" id="number">{{ product.sommecoti }}</p>
    </div>
  </div>
</template>

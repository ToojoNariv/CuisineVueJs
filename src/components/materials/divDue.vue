<script setup>
import { inject, ref, watch } from 'vue';
import apiService from '../../servises/apiService';

const { diosezy, region, fivondronana, roles, paiement} = inject('filters');

const sommeDue = ref([]);

const fetchSomme = () => 
{
  const filters = {
    diosezy: diosezy.value,
    region: region.value,
    fivondronana: fivondronana.value,
    roles: roles.value,
    roles: paiement.value,
  };

  apiService.getDueFiltre(filters)
    .then(response => {
        sommeDue.value = response.data;
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données filtrées :', error);
    });
};

watch([diosezy, region, fivondronana, roles], () => {
  fetchSomme();
}, { immediate: true });

</script>

<template>
  <div class="carte">
    <h3 class="soustitre">Somme Due</h3>
    <div v-for="product in sommeDue" :key="product.id">
      <p class="montant" id="number">{{ product.sommedue }}</p>
    </div>
  </div>
</template>



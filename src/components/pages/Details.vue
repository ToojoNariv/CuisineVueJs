<script setup>
import getFiltre from './Filtre2.vue';
import divSomme from '../materials/divSomme.vue';
import divDue from '../materials/divDue.vue';
import { ref,provide } from 'vue';

const diosezy = ref('');
const region = ref('');
const fivondronana = ref('');
const roles = ref('');
const paiement = ref('');

provide('filters', 
{
  diosezy,
  region,
  fivondronana,
  roles,
  paiement
});
</script>

<template>
    <div class="body" id="app">
        <div class="haut">
          <h1>Filtre des données</h1>
          <divSomme/>
          <divDue/>
        </div>
        <div>
          <getFiltre/>
        </div>
    </div>
  </template>
  
  <style scoped>
    .plushaut
    {
        display: flex;
        flex-direction: row-reverse;
        margin-right: -7vw;
    }
   .body
   {
    display: flex;
    flex-direction: column;
   }
   .haut
   {
    display: flex;
    flex-direction: row;
   }
  </style>
  
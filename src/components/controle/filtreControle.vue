<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps(['diosezy', 'region', 'fivondronana', 'roles', 'paiement']);
const emit = defineEmits(['updateSelection']);

const updateSelection = (field, value) => {
  emit('updateSelection', { field, value });
};

</script>

<template>
  <div class="filters">
    <el-dropdown @command="updateSelection('diosezy', $event)" >
        <el-button class="boutton1">{{ diosezy || 'Sélectionner Diosezy' }}</el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :command="''">Aucun</el-dropdown-item>
            <el-dropdown-item :command="'Antananarivo'">Antananarivo</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- Dropdown pour Région -->
      <el-dropdown @command="updateSelection('region', $event)">
        <el-button class="boutton2">{{ region || 'Sélectionner Faritra' }}</el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :command="''">Aucun</el-dropdown-item>
            <el-dropdown-item :command="'Mahamasina'">Mahamasina</el-dropdown-item>
            <el-dropdown-item :command="'Faravohitra'">Faravohitra</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- Dropdown pour Fivondronana -->
      <el-dropdown @command="updateSelection('fivondronana', $event)">
        <el-button class="boutton3">{{ fivondronana || 'Sélectionner Fivondronana' }}</el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :command="''">Aucun</el-dropdown-item>
            <el-dropdown-item :command="'St Michel'">St Michel</el-dropdown-item>
            <el-dropdown-item :command="'EKAR Faravohitra'">EKAR Faravohitra</el-dropdown-item>
            <el-dropdown-item :command="'Manjakaray'">Manjakaray</el-dropdown-item>
            <el-dropdown-item :command="'Ambatonilita'">Ambatonilita</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- Dropdown pour Role -->
      <el-dropdown @command="updateSelection('roles', $event)">
        <el-button class="boutton4">{{ roles || 'Sélectionner un Role' }}</el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :command="''">Aucun</el-dropdown-item>
            <el-dropdown-item :command="'Beazina'">Beazina</el-dropdown-item>
            <el-dropdown-item :command="'Mpikatroka'">Mpikatroka</el-dropdown-item>
            <el-dropdown-item :command="'Tonia'">Tonia</el-dropdown-item>
            <el-dropdown-item :command="'Filoha Diosezy'">Filoha Diosezy</el-dropdown-item>
            <el-dropdown-item :command="'Filoha Région'">Filoha Région</el-dropdown-item>
            <el-dropdown-item :command="'Ekipa Foibe'">Ekipa Foibe</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- Dropdown pour Paiement -->
      <el-dropdown @command="updateSelection('paiement', $event)">
        <el-button class="boutton5">{{ paiement || 'Sélectionner Paiement' }}</el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :command="''">Aucun</el-dropdown-item>
            <el-dropdown-item :command="'Payé'">Payé</el-dropdown-item>
            <el-dropdown-item :command="'Non payé'">Non payé</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
  </div>
</template>

<style scoped>
    .filters {
        display: flex;
        gap: 20px;
        margin-bottom: 20px;
    }
    .boutton1{
      background-color: aqua;
      border: none;
    }
    .boutton3{
      background-color: aqua;
      border: none;
    }
    .boutton2{
      background-color: aqua;
      border: none;
    }
    .boutton4{
      background-color: aqua;
      border: none;
    }
    .boutton5{
      background-color: aqua;
      border: none;
    }
</style>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps(['diosezy', 'region', 'fivondronana', 'roles', 'paiement']);
const emit = defineEmits(['updateSelection']);

const updateSelection = (field, value) => {
  emit('updateSelection', { field, value });
};

</script>

<template>
    <div class="haut">
    <el-dropdown @command="updateSelection('diosezy', $event)" >
        <el-button class="boutton1">{{ diosezy || 'Sélectionner Diosezy' }}</el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :command="''">Aucun</el-dropdown-item>
            <el-dropdown-item :command="'Antananarivo'">Antananarivo</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-dropdown @command="updateSelection('region', $event)">
        <el-button class="boutton2">{{ region || 'Sélectionner Région' }}</el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :command="''">Aucun</el-dropdown-item>
            <el-dropdown-item :command="'Mahamasina'">Mahamasina</el-dropdown-item>
            <el-dropdown-item :command="'Faravohitra'">Faravohitra</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="bas">
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
    </div>
</template>

<style scoped>
    .haut .bas
    {
        display: flex;
        flex-direction: row;
    }
    .boutton1{
      background-color: aqua;
      border: none;
      margin-bottom: 1vh;
    }
    .boutton3{
      background-color: aqua;
      border: none;
    }
    .boutton2{
      background-color: aqua;
      border: none;
      margin-left: 1vw;
    }
    .boutton4{
      background-color: aqua;
      border: none;
      margin-left: 1vw;
    }
    .boutton5{
      background-color: aqua;
      border: none;
    }
</style>

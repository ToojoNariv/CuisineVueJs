<script setup>
import { inject } from 'vue';
import { ref, onMounted } from 'vue';

const { filtreResults } = inject('filters');
</script>

<template>
  <div>
    <el-table :data="filtreResults" class="custom-table" style="width: 100%;" height="400">
      <el-table-column prop="nom_personne" label="Nom" width="180" />
      <el-table-column prop="prenom" label="Prénom" width="155" />
      <el-table-column prop="datenaissance" label="Date de naissance" width="190" />
      <el-table-column prop="contact" label="Contact" width="160" />
      <el-table-column prop="somme_cotisation" label="Cotisation" width="140" />
      <el-table-column prop="paiement" label="Paiement" width="160" />
      <el-table-column prop="roles" label="Roles" width="160" />
    </el-table>
  </div>
</template>


<style scoped>
  .el-button {
    margin: 0;
  }

  .custom-table {
    border-radius: 10px;
    overflow: hidden;
    background-color: #2d2d2d;
    border: 1px solid #515151;
  }

  .el-table {
    --el-table-border-color: #414141;
    --el-table-border: 1px solid #383838;
    --el-table-text-color: #ffffff;
    --el-table-header-text-color: #0d0d0d;
    --el-table-row-hover-bg-color: #4900b6;
    --el-table-current-row-bg-color: rgb(78 80 81);
    --el-table-header-bg-color: #ffffff;
    --el-table-fixed-box-shadow: var(--el-box-shadow-light);
    --el-table-bg-color: #181818;
    --el-table-tr-bg-color: #181818;
    --el-table-expanded-cell-bg-color: #181818;
    --el-table-fixed-left-column: inset 10px 0 10px -10px rgba(0, 0, 0, 0.15);
    --el-table-fixed-right-column: inset -10px 0 10px -10px rgba(0, 0, 0, 0.15);
    --el-table-index: var(--el-index-normal);
    background-color: var(--el-table-bg-color);
    box-sizing: border-box;
    color: var(--el-table-text-color);
    font-size: 1em;
    font-family: 'Matt';
    height: -moz-fit-content;
    height: fit-content;
    max-width: 100%;
    overflow: hidden;
    position: relative;
    width: 100%;
  }
</style>

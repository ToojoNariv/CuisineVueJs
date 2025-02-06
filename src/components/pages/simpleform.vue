<template>
  <div class="h1">
      <h1>Station de paye simple</h1>
  </div>
  <div class="simple">
      <div class="filters">
          <filtreControleinsert
            :diosezy="diosezy"
            :region="region"
            :fivondronana="fivondronana"
            :roles="roles"
            @updateSelection="updateSelection"
          />
      </div>
    <div class="flex">
      <div class="gauche">
        <div class="soustitre2">Saisissez un nom</div>
        <el-autocomplete
          v-model="state"
          :fetch-suggestions="querySearchAsync"
          placeholder="Saisissez un nom ici"
          @select="handleSelect"
        >
          <template #loading>
            <el-icon class="is-loading">
              <svg class="circular" viewBox="0 0 20 20">
                <g
                  class="path2 loading-path"
                  stroke-width="0"
                  style="animation: none; stroke: none"
                >
                  <circle r="3.375" class="dot1" rx="0" ry="0" />
                  <circle r="3.375" class="dot2" rx="0" ry="0" />
                  <circle r="3.375" class="dot4" rx="0" ry="0" />
                  <circle r="3.375" class="dot3" rx="0" ry="0" />
                </g>
              </svg>
            </el-icon>
          </template>
        </el-autocomplete>
      </div>
      <div class="droite">
        <div class="soustitre2">Inserer la cotisation</div>
        <el-input
          v-model="cotisation"
          style="width: 240px"
          placeholder="Somme en ariary"
          :formatter="formatCurrency"
          :parser="parseCurrency"

        />
      </div>
    </div>
  </div>

  <div class="extra-button">
    <el-button type="primary" class="payer" @click="handleExtraButtonClick">Payer</el-button>
  </div>

</template>

<script lang="ts" setup>
import apiService from "../../servises/apiService";
import filtreControleinsert from "../controle/filtreControleinsert.vue";
import { ref, onMounted } from "vue";


const diosezy = ref("");
const region = ref("");
const fivondronana = ref("");
const roles = ref("");
const state = ref("");
const cotisation = ref("");

const updateSelection = ({ field, value }) => {
  if (field === "diosezy") diosezy.value = value;
  if (field === "region") region.value = value;
  if (field === "fivondronana") fivondronana.value = value;
  if (field === "roles") roles.value = value;

  fetchFilteredLinks();
};

const filteredLinks = ref([]);

const formatCurrency = (value: string) =>
    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  
const parseCurrency = (value: string) => value.replace(/\s/g, "");

const fetchFilteredLinks = () => {
  const appliedFilters = {
    diosezy: diosezy.value,
    region: region.value,
    fivondronana: fivondronana.value,
    roles: roles.value
  };

  apiService.getFiltre2(appliedFilters).then((response) => {filteredLinks.value = response.data;})
    .catch((error) => {console.error("Erreur lors de la récupération des données :", error);
    filteredLinks.value = [];});
};


const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  const results = queryString? filteredLinks.value
        .filter((link) => link.nom_personne.toLowerCase().includes(queryString.toLowerCase()))
        .map((link) => ({ value: link.nom_personne }))
    : filteredLinks.value.map((link) => ({ value: link.nom_personne }));
  console.log('valeurs filtré:',filteredLinks.value);

  setTimeout(() => cb(results), 500);
};

const handleSelect = (item: Record<string, any>) => {
  console.log("Item sélectionné : ", item);
};

const handleExtraButtonClick = async () => {
  console.log("Bouton extra cliqué");

  if (!state.value || !cotisation.value) {
    alert("Nom et cotisation sont requis.");
    return;
  }

  const filters = { nom_personne: state.value };
  try {
    const reponse = await apiService.getDueIndividuel(filters);

    if (reponse.data && reponse.data.length > 0) {
      const userData = reponse.data[0];

      if (cotisation.value > userData.cotisationdue) {
        alert(`Le montant inséré pour ${state.value} est supérieur au montant dû (${userData.cotisationdue}) Ar.`);
        return;
      } else if (cotisation.value < userData.cotisationdue) {
        alert(`Le montant inséré pour ${state.value} est inférieur au montant dû (${userData.cotisationdue}) Ar.`);
        return;
      }
    } else {
      alert(`Le montant dû pour ${state.value} n'a pas pu être trouvé.`);
      return;
    }

    const response = await apiService.update({
      diosezy: diosezy.value,
      region: region.value,
      fivondronana: fivondronana.value,
      roles: roles.value,
      nom_personne: state.value,
      montant: cotisation.value,
    });
    alert('Cotisation mise à jour avec succès!');
  } catch (error) {
    console.error('Erreur lors de la mise à jour des cotisations:', error);
    alert('Une erreur est survenue lors de la mise à jour.');
  }
};

onMounted(() => {
  fetchFilteredLinks();
});
</script>

  
  <style>
.gauche {
    width: 70%;
  }
  .droite {
    margin-left: 1vw;
    width: 20%;
  }
  .simple {
    display: flex;
    margin-left: -12vw;
  }
  .flex {
    display: flex;
    flex-direction: row;
    margin-top: -2vh;
  }

  .filters {
        display: flex;
        flex-direction: column;
        width: 65%;
        margin-bottom: 20px;
    }
  .extra-button 
  {
    margin-top: 20px;
    margin-left: 108%;
    }
  </style>
  
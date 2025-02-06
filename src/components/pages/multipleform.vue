<template>
    <div class="h1">
      <h1>Station de paye simple</h1>
    </div>
    <div class="form">
      <el-button @click="addForm"> + </el-button>
      <el-button @click="removeForm"> - </el-button>
      <el-scrollbar max-height="400px">
        <div v-for="(form, index) in forms" :key="form.id" class="simple">
          <div class="filters">
            <filtreControleinsert
              :diosezy="form.diosezy"
              :region="form.region"
              :fivondronana="form.fivondronana"
              :roles="form.roles"
              @updateSelection="updateFormSelection(index, $event)"
            />
          </div>
        <Transition name="slide-fade">
          <div class="flex">
            <div class="gauche">

                <div class="soustitre2">Saisissez un nom</div>
                <el-autocomplete
                    v-model="form.state"
                    :fetch-suggestions="(queryString, cb) => querySearchAsync(queryString, cb, index)"
                    placeholder="Saisissez un nom ici"
                    @select="handleSelect"
                    />
                </div>

            <div class="droite">
              <div class="soustitre2">Inserer la cotisation</div>
              <el-input
                v-model="form.montant"
                style="width: 240px"
                placeholder="Somme en ariary"
                :formatter="formatCurrency"
                :parser="parseCurrency"
              />
            </div>
          </div>
        </Transition>
        </div>
      </el-scrollbar>
      <div class="extra-button">
        <el-button type="primary" class="payer" @click="handleExtraButtonClick">Payer</el-button>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from "vue";
  import filtreControleinsert from "../controle/filtreControleinsert.vue";
  import apiService from "../../servises/apiService";

  const forms = ref([
    {
      id: Date.now(),
      diosezy: "",
      region: "",
      nom_personne: "",
      fivondronana: "",
      roles: "",
      state: "",
      montant: "",
      filteredLinks: [],
    },
  ]);
  
  // Ajouter un formulaire
  const addForm = () => {
    forms.value.push({
      id: Date.now(),
      diosezy: "",
      region: "",
      fivondronana: "",
      nom_personne: "",
      roles: "",
      state: "",
      montant: "",
      filteredLinks: [],
    });
  };
  
  // Supprimer un formulaire
  const removeForm = () => {
    if (forms.value.length > 0) {
      forms.value.pop();
    }
  };
  
  const updateFormSelection = (index: number, { field, value }) => {
    const form = forms.value[index];
    if (field in form) {
      form[field] = value;
      fetchFilteredLinks(index);
    }
  };

  const fetchFilteredLinks = async (index: number) => {
    const appliedFilters = {
        diosezy: forms.value[index].diosezy,
        region: forms.value[index].region,
        fivondronana: forms.value[index].fivondronana,
        roles: forms.value[index].roles,
    };

    try {
        const response = await apiService.getFiltre2(appliedFilters);
        forms.value[index].filteredLinks = response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        forms.value[index].filteredLinks = [];
    }
};



  const querySearchAsync = (queryString: string, cb: (arg: any) => void, index: number) => {
    const filteredLinks = forms.value[index].filteredLinks;
    const results = queryString
      ? filteredLinks.filter((link) => link.nom_personne.toLowerCase().includes(queryString.toLowerCase()))
      .map((link) => ({ value: link.nom_personne }))
      : filteredLinks.map((link) => ({ value: link.nom_personne }));

    console.log('Valeurs filtrées:', filteredLinks);

    setTimeout(() => cb(results), 500);
  };

  
  const handleSelect = (item: Record<string, any>) => {
    console.log("Selected:", item);
  };
  
  const formatCurrency = (value: string) =>
    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  
  const parseCurrency = (value: string) => value.replace(/\s/g, "");
  

  const handleExtraButtonClick = async () => {
  console.log("Bouton extra cliqué");

  for (let i = 0; i < forms.value.length; i++) {
    try {
      const form = forms.value[i];
      if (!form) {
        console.error("Aucun formulaire trouvé pour l'index donné");
        alert("Aucun formulaire trouvé.");
        continue;
      }

        const filters = { nom_personne: form.state };
        const reponse = await apiService.getDueIndividuel(filters);
        console.log(reponse);

        if (reponse.data && reponse.data.length > 0) 
        {
            const userData = reponse.data[0];
            if (form.montant > userData.cotisationdue) {
                alert(`Le montant inséré pour ${form.state} est supérieur au montant dû (${userData.cotisationdue}) Ar.`);
                continue;
            } else if (form.montant < userData.cotisationdue) {
                alert(`Le montant inséré pour ${form.state} est inférieur au montant dû (${userData.cotisationdue}) Ar.`);
                continue;
            }
        } else {
        alert(`Le montant dû pour ${form.state} n'a pas pu être trouvé.`);
        continue;
        }

      if (!form.state || !form.montant) 
      {
        alert("Nom et montant sont requis.");
        continue;
      }
      const response = await apiService.update({
        diosezy: form.diosezy,
        region: form.region,
        fivondronana: form.fivondronana,
        roles: form.roles,
        nom_personne: form.state,
        montant: form.montant,
      });
      alert('Cotisation mise à jour avec succès!');
    } catch (error) {
      console.error('Erreur lors de la mise à jour des cotisations:', error);
      alert('Une erreur est survenue lors de la mise à jour.');
    }
  }
};

  </script>
  
  

  

  












    <style scoped>
    .form{
        width: 156%;
        margin-left: -11vw;
    }
    .gauche {
        width: 100%;
    }

    .extra-button 
    {
        margin-top: 20px;
        margin-left: 88.7%;
    }
    .droite {
        margin-left: 1vw;
        width: 74%;
    }
    .simple 
    {
        display: flex;
        border: 1px solid #8e8e8e;
        border-radius: 16px;
        margin-top: 3vh;
        width: 95%;
  }
  .filters {
        display: flex;
        flex-direction: column;
        width: 53%;
        margin-left: 3vw;
        margin-top: 3vh;
        margin-bottom: 20px;
    }
    
  .flex {
    display: flex;
    flex-direction: row;
  }
  </style>
  

<script setup>
import { watch, ref, onMounted } from "vue";
import Dialog from 'primevue/dialog';
import PickList from 'primevue/picklist';
import AutoComplete from 'primevue/autocomplete';
import InputGroup from 'primevue/inputgroup';
import FloatLabel from 'primevue/floatlabel';
import apiService from '../../servises/apiService';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';   

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);
const ventes = ref([[], []]);
const localVisible = ref(props.modelValue);

const selectedDish = ref(null);
const chartData = ref();
const chartOptions = ref();
const filteredDishes = ref([]);
const selectedDishData = ref(null);


const size = ref({ label: 'Normal', value: 'null' });
const sizeOptions = ref([
    { label: 'Small', value: 'small' },
    { label: 'Normal', value: 'null' },
    { label: 'Large', value: 'large' }
]);

const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

const getVentes = async () => {
    try {
        const response = await apiService.getVente();
        if (response && response.data) {
            const recetteIds = [...new Set(response.data.map(v => v.recette.split('/').pop()))];
            const recetteDetails = await Promise.all(recetteIds.map(id => apiService.getRecette2(id)));
            const recettesMap = Object.fromEntries(recetteDetails.map(r => [r.data.id, r.data]));

            const ventesAvecDetails = response.data.map(vente => {
                const recetteId = vente.recette.split('/').pop();
                return {
                    ...vente,
                    ...recettesMap[recetteId],
                    image: recettesMap[recetteId].image
                };
            });

            console.log("Ventes avec détails :", ventesAvecDetails);
            ventes.value = [ventesAvecDetails, []];
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des ventes :", error);
    }
};


onMounted(async () => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
    await getVentes();
    await getVentesCharte();
});


const getVentesCharte = async () => {
    try {
        const response = await apiService.ventesParMois();
        if (response && response.data) {
            console.log("Données reçues :", response.data);

            const months = response.data.map(v => {
                const year = v.year;
                const moisIndex = parseInt(v.month, 10) - 1;

                if (moisIndex >= 0 && moisIndex < 12) {
                    return `${monthNames[moisIndex]} ${year}`;
                }
                return "Inconnu";
            });

            const totalPrix = response.data.map(v => v.totalPrix);
            const totalVentes = response.data.map(v => v.totalVentes);

            chartData.value = setChartData(months, totalPrix, totalVentes);
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des ventes :", error);
    }
};
        
const setChartData = (months, totalPrix, totalVentes) => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: months,
        datasets: [
            {
                label: 'Total des ventes (Ar)',
                data: totalPrix,
                fill: false,
                tension: 0.4,
                borderColor: documentStyle.getPropertyValue('--p-cyan-500')
            },
            {
                label: 'Nombre de ventes',
                data: totalVentes,
                fill: false,
                borderDash: [5, 5],
                tension: 0.4,
                borderColor: documentStyle.getPropertyValue('--p-orange-500')
            }
        ]
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}

const searchDishes = async (event) => {
  if (!event.query.trim()) {
    filteredDishes.value = [];
    return;
  }
  try {
    const response = await apiService.getPlatByName(event.query);
    filteredDishes.value = response.data;
  } catch (error) {
    console.error('Erreur lors du chargement des plats', error);
  }
};


const selectedDishVentes = ref({ totalPrix: 0, totalVentes: 0 });

const fetchVentesForDish = async () => {
    if (!selectedDish.value || !selectedDish.value.nom) {
        console.warn("selectedDish est null ou ne contient pas de nom :", selectedDish.value);
        return;
    }
    try {
        console.log("Fetching data for dish:", selectedDish.value.nom);
        const response = await apiService.getVentesParNom(selectedDish.value.nom);
        if (response && response.data) {
            selectedDishVentes.value = response.data;
        } else {
            console.warn("Aucune donnée reçue pour ce plat.");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des ventes par plat", error);
    }
};



const hideModal = () => {
  emit('update:modelValue', false);
};

watch(selectedDish, async (newVal) => {
    console.log("selectedDish changé :", newVal);
    if (newVal) {
        await fetchVentesForDish();
    }
});


watch(() => props.modelValue, (newVal) => {
    localVisible.value = newVal;
});

const formatDate = (isoString) => {
    if (!isoString) return "Date inconnue";
    
    const date = new Date(isoString);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    
    return date.toLocaleDateString('fr-FR', options); 
};

const getImageUrl = (imageData) => {
    if (!imageData) return "";

    if (typeof imageData === "string" && imageData.startsWith("data:image")) {
        return imageData;
    }

    console.warn("Format d'image non reconnu :", imageData);
    return "";
};



</script>


<template>
    <Dialog v-model:visible="localVisible" modal header="Graphique des ventes" :closable="true" @hide="hideModal">
        <div class="card">
            <Chart type="line" :data="chartData" :options="chartOptions" class="h-[100rem]" />
        </div>
        
        <h2>Liste des ventes</h2>
        <PickList v-model="ventes" dataKey="id" breakpoint="1400px">
                <template #option="{ option, selected }">
                    <div class="flex flex-wrap p-1 items-center gap-4 w-full">
                        <img class="w-12 shrink-0 rounded" :src="option.image" v-if="option.image" />
                        <div class="flex-1 flex flex-col"><span class="font-medium text-sm">{{ option.nom }}</span></div>
                        <span >{{ option.prix }} Ar</span><br>
                        <span class="font-bold">{{ formatDate(option.dateAchat) }}</span>
                    </div>
                </template>
            </PickList>

        <h2>Total de vente par plat</h2>
        <InputGroup>
        <FloatLabel variant="on">
            <AutoComplete
                v-model="selectedDish"
                inputId="id"
                :suggestions="filteredDishes"
                @complete="searchDishes"
                optionLabel="nom"
            />


          <label for="id">Cherchez un plat</label>
        </FloatLabel>
      </InputGroup>

      <div v-if="selectedDish">
        <div class="card">
            <h2>Informations pour {{ selectedDish.nom }}</h2>

            <div class="flex justify-center mb-6">
                <SelectButton v-model="size" :options="sizeOptions" optionLabel="label" dataKey="label" />
            </div>

            <DataTable :value="[selectedDishVentes]" :size="size.value" tableStyle="min-width: 30rem">
                <Column field="nom" header="Nom du plat">
                    <template #body="slotProps">
                        {{ selectedDish.nom }}
                    </template>
                </Column>
                <Column field="totalVentes" header="Nombres des ventes"></Column>
                <Column field="totalPrix" header="Total des prix de vente(Ar)">
                    <template #body="slotProps">
                        {{ slotProps.data.totalPrix.toLocaleString('fr-FR') }} Ar
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>

    </Dialog>
</template>
<style scoped>

</style>

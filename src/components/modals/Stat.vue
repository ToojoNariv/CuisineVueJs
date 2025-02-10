<script setup>
import { watch, ref, onMounted } from "vue";
import Dialog from 'primevue/dialog';
import PickList from 'primevue/picklist';
import apiService from '../../servises/apiService';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);
const localVisible = ref(props.modelValue);

const chartData = ref();
const chartOptions = ref();

const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

const ventes = ref([[], []]);
onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
    getVentes();
    getVentesCharte();
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
            
            ventes.value = [ventesAvecDetails, []];
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



const hideModal = () => {
  emit('update:modelValue', false);
};

watch(() => props.modelValue, (newVal) => {
    localVisible.value = newVal;
});

const formatDate = (isoString) => {
    if (!isoString) return "Date inconnue";
    
    const date = new Date(isoString);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    
    return date.toLocaleDateString('fr-FR', options); 
};
const getImageUrl = (image) => {
    const cleanedBase64 = image.replace(/\s/g, '');
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
                    {{ console.log("Vente option :", option) }}
                    <div class="flex flex-wrap p-1 items-center gap-4 w-full">
                        <img 
                            class="w-12 shrink-0 rounded" 
                            :src="'data:image/png;base64,' + getImageUrl(option.image)" />
                        <div class="flex-1 flex flex-col"><span class="font-medium text-sm">{{ option.nom }}</span></div>
                        <span >{{ option.prix }} Ar</span><br>
                        <span class="font-bold">{{ formatDate(option.dateAchat) }}</span>
                    </div>
                </template>
            </PickList>

    </Dialog>
</template>
<style scoped>

</style>

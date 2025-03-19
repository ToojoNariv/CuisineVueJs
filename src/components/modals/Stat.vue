<template>
    <div class="analytics-container">
      <h1>Analytiques en temps réel</h1>
  
    
      <DataTable :value="analyticsData" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 20]">
        <Column field="country" header="Pays"></Column>
        <Column field="activeUsers" header="Utilisateurs actifs"></Column>
      </DataTable>
  

      <Chart type="bar" :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Chart from 'primevue/chart';
  
  export default {
    components: {
      DataTable,
      Column,
      Chart,
    },
    setup() {
      const analyticsData = ref([]); 
      const chartData = ref({}); 
      const chartOptions = ref({}); 
  
      
      const fetchAnalyticsData = async () => {
        try {
          const response = await fetch('/admin/analytics/data'); 
          const data = await response.json();
  

          analyticsData.value = data;
  
          chartData.value = {
            labels: data.map((item) => item.country), 
            datasets: [
              {
                label: 'Utilisateurs actifs',
                backgroundColor: '#42A5F5',
                data: data.map((item) => item.activeUsers),
              },
            ],
          };
  
          
          chartOptions.value = {
            responsive: true,
            maintainAspectRatio: false,
          };
        } catch (error) {
          console.error('Erreur lors de la récupération des données analytiques :', error);
        }
      };
  
      onMounted(() => {
        fetchAnalyticsData();
      });
  
      return {
        analyticsData,
        chartData,
        chartOptions,
      };
    },
  };
  </script>
  
  <style scoped>
  .analytics-container {
    padding: 20px;
  }
  
  h1 {
    margin-bottom: 20px;
  }
  </style>
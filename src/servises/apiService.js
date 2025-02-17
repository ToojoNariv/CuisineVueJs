import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://symfony-app-production.up.railway.app',
  headers: { 'Content-Type': 'application/json' }
});

export default 
{
  // getFiltre(filtre) 
  // {
  //   return apiClient.get('/filtre',{params: filtre})
  // },

  // getFiltre2(filtre) 
  // {
  //   return apiClient.get('/filtre2',{params: filtre})
  // },

  // getSommeFiltre(filtre) 
  // {
  //   return apiClient.get('/sommeFiltre',{params: filtre})
  // },

  // getDueFiltre(filtre) 
  // {
  //   return apiClient.get('/dueFiltre',{params: filtre})
  // },

  // getDueIndividuel(filtre) 
  // {
  //   return apiClient.get('/dueIndividuel',{params: filtre})
  // },

  getRecette() 
  {
    return apiClient.get('/recettes')
  },

  insertionRecette(filtre) 
  {
    return apiClient.post('/insertrecette', filtre);
  }

  // update(filtre) {
  //   return apiClient.post('/update',filtre);
  // }
};

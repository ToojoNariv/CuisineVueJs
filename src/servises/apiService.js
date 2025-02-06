import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  // baseURL: 'https://symfony-app-production.up.railway.app//api',
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

  // login(filtre) {
  //   return apiClient.post('/login', filtre);
  // },

  // update(filtre) {
  //   return apiClient.post('/update',filtre);
  // }
};

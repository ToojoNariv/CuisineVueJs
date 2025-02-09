import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://symfony-app-production.up.railway.app/',
  // baseURL: 'http://127.0.0.1:8000/',
  headers: { 'Content-Type': 'application/json' }
});

export default 
{
  getRecette() 
  {
    return apiClient.get('recettes')
  },

  insertionRecette(filtre) {
    return apiClient.post('insertplat', filtre, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  insertionIngredient(filtre) {
    return apiClient.post('insertingredient', filtre, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  
  getIngredientByName(nom) {
    return apiClient.get('ingredientbyname', {
      params: { nom }
    });
  },

  envoyerStock(data) {
    return apiClient.post('stockingredient', data);
  }
};

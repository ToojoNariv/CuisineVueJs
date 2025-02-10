import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://symfony-app-production.up.railway.app/',
  headers: { 'Content-Type': 'application/json' }
});

export default 
{
  getRecette() 
  {
    return apiClient.get('recettes')
  },

  getRecette2(id) {
      return apiClient.get(`recettesbyid/${id}`);
  },

  getVente() 
  {
    return apiClient.get('ventes')
  },
  ventesParMois() {
    return apiClient.get('ventesparmois');
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

  getPlatByName(nom) {
    return apiClient.get('platbyname', {
      params: { nom }
    });
  },

  envoyerStock(data) {
    return apiClient.post('stockingredient', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  creeRecette(data) {
    const formData = new FormData();
    formData.append('dishId', data.dishId);
    formData.append('ingredients', JSON.stringify(data.ingredients));
  
    return apiClient.post('creerecette', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};

<template>
    <!-- <el-button plain @click="centerDialogVisible = true">Se connecter</el-button> -->
    <el-button plain @click="Login">Se connecter</el-button>
  
    <el-dialog v-model="centerDialogVisible" title="Connectez-vous" width="480" left>
        <el-form :model="form">
                <el-input v-model="form.nom_personne" style="width: 100%" placeholder="Entrez votre nom"/>
                <el-input v-model="form.contact" style="width: 100%" type="password" placeholder="Saisissez votre mot contact" show-password />
        </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="centerDialogVisible = false">Annuler</el-button>
          <el-button type="primary" @click="Login">Se connecter</el-button>
        </div>
      </template>
    </el-dialog>
  </template>
  <script setup>
    import { ref } from 'vue'
    import apiService from '../../servises/apiService';
    import { useRouter } from 'vue-router';

    const form = ref({
        nom_personne: '',
        contact: '',
    });

    const router = useRouter();

    const centerDialogVisible = ref(false);
    const Login = async () => {
    router.push('/details');
    // try {
    //     const response = await apiService.login({
    //     nom_personne: form.value.nom_personne,
    //     contact: form.value.contact,
    //     });

    //     if (response.data && response.data.length > 0) {
    //         const userData = response.data[0];
    //         console.log("Les données :", userData);
            
    //         if (userData.roles !== 'Filoha Diosezy' && userData.roles !== 'Filoha Région') {
    //             centerDialogVisible.value = false;
    //             router.push('/simpleform');
    //         } else if (userData.roles === 'Filoha Diosezy' || userData.roles === 'Filoha Région') {
    //             centerDialogVisible.value = false;
    //             router.push('/multipleform');
    //         }
    //     } else {
    //         alert('Nom ou mot de passe incorrect.');
    //     }

    // } catch (error) {
    //     console.error('Erreur lors de la connexion :', error);
    //     alert('Une erreur est survenue. Veuillez réessayer.');
    // }
    };
</script>


<style scoped>
.el-input
{
  display: flex;
  justify-content: center;
}
</style>
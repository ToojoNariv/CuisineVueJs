<template>
    <div class="login-container">
      <h1>Connexion</h1>
  
      <!-- Formulaire de connexion -->
      <form @submit.prevent="handleLogin">
        <div class="p-field">
          <label for="email">Email</label>
          <InputText id="email" v-model="email" type="email" placeholder="Entrez votre email" required />
        </div>
  
        <div class="p-field">
          <label for="password">Mot de passe</label>
          <Password id="password" class="pass" v-model="password" placeholder="Entrez votre mot de passe" :feedback="false" required />
        </div>
  
        <Button type="submit" label="Se connecter" class="p-button-primary" />
      </form>
  
      <Message v-if="errorMessage" severity="error">{{ errorMessage }}</Message>
      <Message v-if="successMessage" severity="success">{{ successMessage }}</Message>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import InputText from 'primevue/inputtext';
  import Password from 'primevue/password';
  import Button from 'primevue/button';
  import Message from 'primevue/message';
  
  export default {
    name: 'Login',
    components: {
      InputText,
      Password,
      Button,
      Message,
    },
    setup() {
      const email = ref(''); 
      const password = ref(''); 
      const errorMessage = ref(''); 
      const successMessage = ref(''); 
  
     
      const handleLogin = async () => {
        try {
         
          errorMessage.value = '';
          successMessage.value = '';
  
         
          const response = await fetch('/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email.value,
              password: password.value,
            }),
          });
  
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Échec de la connexion');
          }
  
 
          const data = await response.json();
          successMessage.value = 'Connexion réussie !';
          console.log('Utilisateur connecté :', data);
  
          // Rediriger l'utilisateur (par exemple, vers le tableau de bord)
          // this.$router.push('/dashboard');
        } catch (error) {
          errorMessage.value = error.message || 'Une erreur est survenue';
          console.error('Erreur lors de la connexion :', error);
        }
      };
  
      return {
        email,
        password,
        errorMessage,
        successMessage,
        handleLogin,
      };
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: rgb(31, 31, 31);
  }
  
  .p-field {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: rgb(31, 31, 31);
  }
  
  .p-button {
    width: 100%;
    margin-top: 1rem;
  }
  .p-inputtext
  {
    width: 100%;
  }
  .pass
  {
    width: 100% !important;
  }
  </style>
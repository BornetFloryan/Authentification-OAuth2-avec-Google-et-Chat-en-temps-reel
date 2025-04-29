<template>
  <div class="login-container">
    <h1>Connexion</h1>
    <form @submit.prevent="handleLocalLogin">
      <div class="form-group">
        <label for="email">Adresse email</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" class="btn">Se connecter</button>
    </form>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <div class="oauth-container">
      <h2>Ou connectez-vous avec</h2>
      <a href="/auth/google" class="btn btn-google">Google</a>
      <a href="/auth/github" class="btn btn-github">GitHub</a>
    </div>

    <div class="register-link">
      <router-link to="/register">Créer un compte</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    ...mapActions(['login']),
    async handleLocalLogin() {
      this.errorMessage = '';
      try {
        await this.login({ email: this.email, password: this.password });
        this.$router.push('/dashboard');
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          this.errorMessage = error.response.data.error;
        } else {
          this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
        }
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* Styles inchangés */
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  font-family: 'Inter', sans-serif;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1, h2 {
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  font-weight: 500;
  color: #555;
}

input {
  width: 100%;
  padding: 12px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
}

input:focus {
  outline: none;
  border-color: #3f51b5;
  box-shadow: 0 0 5px rgba(63, 81, 181, 0.3);
}

.btn {
  display: block;
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn:hover {
  background-color: #303f9f;
  transform: scale(1.02);
}

.btn-google {
  background-color: #db4437;
  margin-top: 10px;
}

.btn-google:hover {
  background-color: #c23321;
}

.btn-github {
  background-color: #333333;
  margin-top: 10px;
}

.btn-github:hover {
  background-color: #24292e;
}

.oauth-container {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.register-link {
  margin-top: 20px;
  font-size: 1rem;
}

.register-link a {
  color: #3f51b5;
  text-decoration: none;
  font-weight: 600;
}

.register-link a:hover {
  text-decoration: underline;
}

.oauth-container h2 {
  margin-bottom: 15px;
  font-size: 1.2rem;
  color: #555;
}

.error-message {
  color: red;
  margin-top: 10px;
  font-size: 0.9rem;
}
</style>
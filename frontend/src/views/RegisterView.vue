<template>
  <div class="register-container">
    <h1>Créer un compte</h1>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="register-email">Adresse email</label>
        <input
            type="email"
            id="register-email"
            v-model="registerEmail"
            required
        />
      </div>
      <div class="form-group">
        <label for="register-password">Mot de passe</label>
        <input
            type="password"
            id="register-password"
            v-model="registerPassword"
            required
        />
      </div>
      <button type="submit" class="btn" :disabled="isLoading">
        <span v-if="isLoading">Chargement...</span>
        <span v-else>S'inscrire</span>
      </button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterView",
  data() {
    return {
      registerEmail: "",
      registerPassword: "",
      isLoading: false,
      errorMessage: "",
    };
  },
  methods: {
    async handleRegister() {
      if (!this.registerEmail || !this.registerPassword) {
        this.errorMessage = "Veuillez remplir tous les champs.";
        return;
      }

      this.isLoading = true;
      this.errorMessage = "";

      try {
        const response = await axios.post(
            "http://localhost:5000/auth/local/register",
            {
              email: this.registerEmail,
              password: this.registerPassword,
            }
        );
        if (response.status === 201) {
          alert("Compte créé avec succès. Vous pouvez maintenant vous connecter.");
          this.$router.push("/login");
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          this.errorMessage = error.response.data.error;
        } else {
          this.errorMessage = "Une erreur est survenue. Veuillez réessayer.";
        }
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  font-family: "Inter", sans-serif;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
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
  font-family: "Inter", sans-serif;
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

.btn:disabled {
  background-color: #9fa8da;
  cursor: not-allowed;
}

.btn:hover:not(:disabled) {
  background-color: #303f9f;
  transform: scale(1.02);
}

.error-message {
  color: red;
  margin-top: 10px;
  font-size: 0.9rem;
}
</style>
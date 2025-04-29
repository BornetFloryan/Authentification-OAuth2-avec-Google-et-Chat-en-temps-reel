<template>
  <div class="home">
    <header class="hero">
      <h1>Bienvenue sur notre application</h1>
      <p>Explorez nos fonctionnalités et découvrez tout ce que nous avons à offrir.</p>
      <router-link
          v-if="auth"
          to="/dashboard"
          class="btn"
          @click="handleLogout"
      >
        Se déconnecter
      </router-link>
      <router-link
          v-else
          to="/login"
          class="btn"
      >
        Se connecter
      </router-link>
    </header>
    <section class="features">
      <h2>Nos fonctionnalités</h2>
      <ul>
        <li>Authentification sécurisée</li>
        <li>Gestion des utilisateurs</li>
        <li>Tableau de bord interactif</li>
      </ul>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'HomeView',
  computed: {
    ...mapState(['auth']),
  },
  created() {
    this.checkAuth();
  },
  methods: {
    ...mapActions(['checkAuth', 'logout']),
    async handleLogout() {
      await this.logout();
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.home {
  text-align: center;
  padding: 20px;
}

.hero {
  background-color: #f5f5f5;
  padding: 50px 20px;
  margin-bottom: 30px;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.hero .btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.hero .btn:hover {
  background-color: #369f6b;
}

.features h2 {
  font-size: 1.8rem;
  margin-bottom: 15px;
}

.features ul {
  list-style: none;
  padding: 0;
}

.features li {
  font-size: 1.2rem;
  margin: 10px 0;
}
</style>
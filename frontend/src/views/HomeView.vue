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
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

.home {
  text-align: center;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
  color: #333;
}

.hero {
  background: linear-gradient(135deg, #42b983, #369f6b);
  color: white;
  padding: 60px 20px;
  margin-bottom: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.hero h1 {
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 15px;
}

.hero p {
  font-size: 1.2rem;
  font-weight: 300;
  margin-bottom: 25px;
}

.hero .btn {
  display: inline-block;
  padding: 12px 25px;
  background-color: white;
  color: #42b983;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.hero .btn:hover {
  background-color: #f5f5f5;
  color: #369f6b;
  transform: translateY(-2px);
}

.features h2 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 20px;
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
<template>
  <nav class="navbar">
    <div class="nav-wrapper">
      <router-link
          :to="auth ? '/dashboard' : '/'"
          class="brand-logo"
      >
        BUT S4 R403 + R401
      </router-link>
      <ul class="nav-links">
        <li v-if="auth === null"></li>
        <li v-else-if="auth === false">
          <router-link to="/login" class="btn-login">Se connecter</router-link>
        </li>
        <li v-else>
          <router-link to="/dashboard" class="btn-link">Mon tableau de bord</router-link>
          <a href="/auth/logout" class="btn-logout">Déconnexion</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'HeaderView',
  computed: {
    ...mapState(['auth']),
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.navbar {
  background-color: #1e1e2f;
  padding: 0 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', sans-serif;
}

.nav-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.brand-logo {
  font-size: 1.8rem;
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.brand-logo:hover {
  color: #4caf50;
}

.nav-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
}

.nav-links li {
  margin-left: 20px;
}

.btn-login,
.btn-link,
.btn-logout {
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease, transform 0.2s ease;
}

.btn-login {
  background-color: #4caf50;
}

.btn-login:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

.btn-link {
  background-color: #2196f3;
}

.btn-link:hover {
  background-color: #1976d2;
  transform: scale(1.05);
}

.btn-logout {
  background-color: #f44336;
}

.btn-logout:hover {
  background-color: #d32f2f;
  transform: scale(1.05);
}
</style>
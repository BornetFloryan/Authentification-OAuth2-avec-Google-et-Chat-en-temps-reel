<template>
  <div id="app">
    <h1 class="title">Mini-projet 3 - Authentification OAuth2 avec Google et Chat en temps réel : Floryan BORNET, Corentin BRENDLE</h1>
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from './components/HeaderView.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    Header,
  },
  created() {
    this.fetchAuth();
  },
  methods: {
    ...mapActions(['fetchAuth']),
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

.title {
  font-family: 'Poppins', sans-serif;
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin: 20px 0;
  line-height: 1.5;
  background: linear-gradient(135deg, #42b983, #369f6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
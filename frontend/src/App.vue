<template>
  <div id="app">
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
</style>


<template>
  <div class="dashboard-container">
    <h1 class="dashboard-title">Chat instantané en ligne</h1>
    <p class="dashboard-subtitle">Bienvenue sur votre chat instantané en ligne !</p>
    <div class="chat-wrapper">
      <ChatView />
    </div>
  </div>
</template>

<script>
import ChatView from '@/components/ChatView.vue';

export default {
  name: 'DashboardView',
  components: {
    ChatView,
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

.dashboard-container {
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f4f4f9;
  min-height: 100vh;
}

.dashboard-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
}

.dashboard-subtitle {
  font-size: 1.2rem;
  font-weight: 400;
  color: #666;
  margin-bottom: 20px;
  text-align: center;
}

.chat-wrapper {
  width: 80%;
  max-width: 1200px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
</style>
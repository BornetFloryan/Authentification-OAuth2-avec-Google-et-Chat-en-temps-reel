<template>
  <div v-if="auth && auth.email" class="chat-container">

    <div class="messages">
      <div
          v-for="(message, index) in messages"
          :key="index"
          :class="['message', message.username === auth.email ? 'my-message' : 'other-message']"
      >
        <p class="message-content">{{ message.text }}</p>
        <p class="message-meta">
          <span class="message-sender">{{ message.username === auth.email ? 'Vous ' : message.username }}</span>
          <span class="message-timestamp">{{ new Date(message.createdAt).toLocaleTimeString() }}</span>
        </p>
      </div>
    </div>

    <form @submit.prevent="sendMessage" class="message-form">
      <input v-model="newMessage" placeholder="Écrivez un message..." class="message-input" />
      <button type="submit" class="send-button">Envoyer</button>
    </form>
  </div>
</template>

<script>
import io from 'socket.io-client';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      socket: null,
      messages: [],
      newMessage: '',
      connectedUsers: [],
    };
  },
  computed: {
    ...mapState(['auth']),
  },
  watch: {
    auth: {
      immediate: true,
      handler(newAuth) {
        if (newAuth && newAuth.email) {
          this.initializeSocket();
        }
      },
    },
  },
  methods: {
    initializeSocket() {
      this.socket = io('http://localhost:5000');

      this.socket.on('chat_message', (message) => {
        if (!this.messages.some((msg) => msg._id === message._id)) {
          this.messages.push(message);
        }
      });

      this.socket.on('chat_history', (history) => {
        this.messages = history;
      });

      this.socket.on('connected_users', (users) => {
        this.connectedUsers = users;
      });
    },
    sendMessage() {
      if (!this.newMessage.trim() || !this.auth || !this.auth.email) {
        console.error('Message invalide ou utilisateur non authentifié.');
        return;
      }

      const message = {
        username: this.auth.email,
        text: this.newMessage,
        createdAt: new Date(),
      };
      this.socket.emit('chat_message', message);
      this.newMessage = '';
    },
  },
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 500px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f9f9f9;
  box-sizing: border-box;
}

.connected-users {
  padding: 10px;
  background-color: #e9f5ff;
  border-bottom: 1px solid #ddd;
}

.connected-users h3 {
  margin: 0 0 10px;
  font-size: 16px;
  color: #333;
}

.connected-users ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.connected-users li {
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  background-color: #ffffff;
  border-bottom: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
}

.message {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  max-width: 70%;
}

.my-message {
  background-color: #d1f7c4;
  align-self: flex-end;
}

.other-message {
  background-color: #f1f1f1;
  align-self: flex-start;
}

.message-content {
  margin: 0;
  font-size: 14px;
  color: #333;
}

.message-meta {
  margin-top: 5px;
  font-size: 12px;
  color: #666;
  text-align: right;
}

.message-form {
  display: flex;
  padding: 10px;
  background-color: #f9f9f9;
  width: 100%;
  box-sizing: border-box;
}
.message-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.send-button {
  margin-left: 10px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.send-button:hover {
  background-color: #45a049;
}
</style>
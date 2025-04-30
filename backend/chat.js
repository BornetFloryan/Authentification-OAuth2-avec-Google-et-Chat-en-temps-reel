const { Server } = require('socket.io');
const Message = require('./models/Message');

module.exports = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', async (socket) => {
        console.log(`Un utilisateur est connecté : ${socket.id}`);

        try {
            const oldMessages = await Message.find().sort({ createdAt: 1 }).limit(100);
            socket.emit('chat_history', oldMessages);
        } catch (error) {
            console.error('Erreur lors de la récupération des anciens messages :', error);
        }

        socket.on('chat_message', async (data) => {
            if (!data.text || !data.username) {
                console.error('Données invalides :', data);
                return socket.emit('error', 'Le message doit contenir un texte et un nom d\'utilisateur.');
            }

            try {
                const newMessage = new Message({
                    username: data.username,
                    text: data.text,
                    createdAt: data.createdAt || Date.now(),
                });
                await newMessage.save();
                io.emit('chat_message', newMessage);
            } catch (error) {
                console.error("Erreur lors de l'enregistrement du message :", error);
                socket.emit('error', 'Erreur lors de l\'enregistrement du message');
            }
        });

        socket.on('disconnect', () => {
            console.log(`Utilisateur déconnecté : ${socket.id}`);
        });
    });
};
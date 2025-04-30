const mongoose = require('mongoose');
const Message = require('../models/Message');

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Gestion des messages
 */

module.exports = (app) => {
    app.get('/api/messages', async (req, res) => {
        const { username } = req.query;
        try {
            const messages = await Message.find({ username }).sort({ createdAt: 1 });
            res.send(messages);
        } catch (err) {
            res.status(500).send({ error: 'Erreur lors de la récupération des messages.' });
        }
    });
};
/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Récupère les messages d'un utilisateur
 *     tags: [Messages]
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Nom d'utilisateur
 *     responses:
 *       200:
 *         description: Liste des messages triés par date
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                     description: Nom d'utilisateur
 *                   text:
 *                     type: string
 *                     description: Contenu du message
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Date de création du message
 *       500:
 *         description: Erreur lors de la récupération des messages
 */
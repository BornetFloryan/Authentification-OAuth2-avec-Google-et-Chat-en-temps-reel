const passport = require('passport');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('users');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gestion de l'authentification
 */

module.exports = app => {
    app.post('/auth/local/register', async (req, res) => {
        const { email, password } = req.body;
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).send({ error: 'Cet email est déjà utilisé.' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ email, password: hashedPassword });
            await user.save();
            res.status(201).send({ message: 'Utilisateur créé avec succès.' });
        } catch (err) {
            console.error('Erreur lors de l\'inscription :', err);
            res.status(500).send({ error: 'Erreur lors de la création du compte.' });
        }
    });
    /**
     * @swagger
     * /auth/local/register:
     *   post:
     *     summary: Inscription d'un nouvel utilisateur
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 example: user@example.com
     *               password:
     *                 type: string
     *                 example: password123
     *     responses:
     *       201:
     *         description: Utilisateur créé avec succès.
     *       400:
     *         description: L'email est déjà utilisé.
     *       500:
     *         description: Erreur lors de la création du compte.
     */

    app.post(
        '/auth/local',
        (req, res, next) => {
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    return res.status(500).send({ error: 'Erreur interne du serveur.' });
                }
                if (!user) {
                    return res.status(401).send({ error: info.message || 'Identifiants invalides.' });
                }
                req.logIn(user, (err) => {
                    if (err) {
                        return res.status(500).send({ error: 'Erreur lors de la connexion.' });
                    }
                    res.status(200).send({ data: user });
                });
            })(req, res, next);
        }
    );
    /**
     * @swagger
     * /auth/local:
     *   post:
     *     summary: Connexion avec un compte local
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 example: user@example.com
     *               password:
     *                 type: string
     *                 example: password123
     *     responses:
     *       200:
     *         description: Connexion réussie.
     *       401:
     *         description: Identifiants invalides.
     *       500:
     *         description: Erreur interne du serveur.
     */

    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );
    /**
     * @swagger
     * /auth/google:
     *   get:
     *     summary: Connexion via Google
     *     tags: [Auth]
     *     responses:
     *       302:
     *         description: Redirection vers Google pour l'authentification.
     */

    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('http://localhost:8080/dashboard');
        }
    );
    /**
     * @swagger
     * /auth/google/callback:
     *   get:
     *     summary: Callback après authentification Google
     *     tags: [Auth]
     *     responses:
     *       302:
     *         description: Redirection vers le tableau de bord.
     */

    app.get(
        '/auth/github',
        passport.authenticate('github', {
            scope: ['user:email']
        })
    );
    /**
     * @swagger
     * /auth/github:
     *   get:
     *     summary: Connexion via GitHub
     *     tags: [Auth]
     *     responses:
     *       302:
     *         description: Redirection vers GitHub pour l'authentification.
     */

    app.get(
        '/auth/github/callback',
        passport.authenticate('github'),
        (req, res) => {
            res.redirect('http://localhost:8080/dashboard');
        }
    );
    /**
     * @swagger
     * /auth/github/callback:
     *   get:
     *     summary: Callback après authentification GitHub
     *     tags: [Auth]
     *     responses:
     *       302:
     *         description: Redirection vers le tableau de bord.
     */

    app.get('/auth/logout', async (req, res) => {
        try {
            await req.logout();
            req.session.destroy(err => {
                if (err) {
                    return res.status(500).send({ error: 'Erreur lors de la déconnexion.' });
                }
                res.redirect('http://localhost:8080/');
            });
        } catch (err) {
            console.error('Erreur lors de la déconnexion :', err);
            res.status(500).send({ error: 'Erreur lors de la déconnexion.' });
        }
    });
    /**
     * @swagger
     * /auth/logout:
     *   get:
     *     summary: Déconnexion de l'utilisateur
     *     tags: [Auth]
     *     responses:
     *       302:
     *         description: Redirection vers la page d'accueil.
     *       500:
     *         description: Erreur lors de la déconnexion.
     */

    app.get('/api/current_user', (req, res) => {
        res.send(req.user || null);
    });
    /**
     * @swagger
     * /api/current_user:
     *   get:
     *     summary: Récupère l'utilisateur actuellement connecté
     *     tags: [Auth]
     *     responses:
     *       200:
     *         description: Utilisateur connecté.
     *       204:
     *         description: Aucun utilisateur connecté.
     */
};
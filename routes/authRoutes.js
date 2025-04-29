const passport = require('passport');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('users');

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
                    res.status(200).send({ message: 'Connexion réussie.' });
                });
            })(req, res, next);
        }
    );

    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('http://localhost:8080/dashboard');
        }
    );

    app.get(
        '/auth/github',
        passport.authenticate('github', {
            scope: ['user:email']
        })
    );

    app.get(
        '/auth/github/callback',
        passport.authenticate('github'),
        (req, res) => {
            res.redirect('http://localhost:8080/dashboard');
        }
    );

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

    app.get('/api/current_user', (req, res) => {
        res.send(req.user || null);
    });
};
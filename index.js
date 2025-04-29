const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const dev = require('./config/dev');
require('./models/User');
require('./services/passport');

const app = express();

app.use(express.json());

app.use(
    session({
        secret: dev.cookieKey,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 30 * 24 * 60 * 60 * 1000,
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({ origin: ['http://localhost:8080', 'http://localhost:3000'], credentials: true }));

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentation de l\'API',
        },
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

require('./routes/authRoutes')(app);

app.get('/', (req, res) => {
    res.send('Salut!');
});

const PORT = process.env.PORT || 5000;

mongoose
    .connect(dev.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connexion à MongoDB réussie !');
        app.listen(PORT, () => {
            console.log(`Le serveur écoute sur le port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Erreur de connexion à MongoDB :', err);
        process.exit(1);
    });
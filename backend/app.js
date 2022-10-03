//Importer les élément sécurisé sur .env
require('dotenv').config()

// Déclaration des constantes 
const path = require('path');
const express = require('express');
const app = express();
const postRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

//erreur CORS 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Utilisation d'express - récupere les infos de type json pour les envoyer
app.use(express.json());

// Route images
app.use('/images', express.static(path.join(__dirname, 'images')));
// Routes Utilisateur & Sauces
app.use('/api/posts', postRoutes);
app.use('/api/auth', userRoutes);

// Utilisation de MongoDB
const mongoose = require('mongoose');

mongoose.connect(process.env.USERBD, //Lien sécurisé dans fichier dotenv
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Exporter app.js vers server.js
module.exports = app;
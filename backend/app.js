//Importer les élément sécurisé sur .env
require('dotenv').config()

// Déclaration des constantes 
const path = require('path');
const express = require('express');
const app = express();
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

// Utilisation d'express - récupere les infos de type json pour les envoyer
app.use(express.json());

//erreur CORS 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  next();
});

// Route images
app.use('/images', express.static(path.join(__dirname, 'images')));
// Routes Utilisateur & post
app.use('/groupomania/post', postRoutes);
app.use('/groupomania/auth', userRoutes);

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
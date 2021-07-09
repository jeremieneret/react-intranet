require('colors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

// Création d'une application ExpressJS
const app = express();

// Analyse les données JSON envoyées par le client
app.use('/', express.json());
app.use(morgan('dev'));

// Middleware qui permet d'autoriser les requêtes Ajax provenant d'un autre domaine
app.use('/', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Inclusion du contrôleur de routes des collaborateurs
const collaborateur = require('./collaborateur');

// Définition des routes de l'application
app.get('/collaborateurs', collaborateur.findAll);
app.get('/collaborateur/:id', collaborateur.findOne);
app.post('/collaborateurs', collaborateur.create);
app.put('/collaborateur/:id', collaborateur.update);
app.delete('/collaborateur/:id', collaborateur.remove);

// Route pour le front
app.get('/', (req, res) => {
  res.sendFile(path.resolve('./build/index.html'));
});

// Ressources statiques
app.use('/', express.static(path.resolve('./build')));

/*
    Configuration
*/

app.set('ip', process.env.IP || 'localhost');
app.set('port', process.env.PORT || 9000);

// Transformation de la méthode app.listen() d'Express en "Promesse JS"
const startApp = (app) => {
  return new Promise((resolve, reject) => {
    const server = app.listen(app.get('port'), app.get('ip'), resolve);
    server.on('error', reject);
  });
};

// Démarrage de l'app Express
(async () => {
  try {
    await startApp(app);
    console.log(`Server started on http://${app.get('ip')}:${app.get('port')} `.bgGreen.black);
    console.log('');
    console.log(`      GET /collaborateurs`.white + '  - Renvoie la liste de tous les collaborateurs'.gray);
    console.log(`      GET /collaborateur/4`.white + ' - Affiche le collaborateur n°4'.gray);
    console.log(`     POST /collaborateurs`.white + '  - Créer un nouveau collaborateur'.gray);
    console.log(`      PUT /collaborateur/4`.white + ' - Modifie le collaborateur n°4'.gray);
    console.log(`   DELETE /collaborateur/4`.white + ' - Supprime le collaborateur n°4'.gray);
    console.log('');
  } catch (err) {
    console.log(err.message.red);
  }
})();
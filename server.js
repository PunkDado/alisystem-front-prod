const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/pedido-produtos'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/pedido-produtos/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

/* Tentativa de driblar o CORS Problem
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
  });
  */
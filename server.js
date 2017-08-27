require('dotenv').config();
const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
const http       = require('http');
const mongoose   = require('mongoose');
const morgan     = require("morgan"); 
const jwt        = require('jsonwebtoken');
const app        = express();
const apiRoutes  = express.Router(); 

const usersRoutes = require('./server/routes/users');
const authRoutes = require('./server/routes/auth');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

// API file for interacting with MongoDB
//const api = require('./server/routes/api');

// Logging
app.use(morgan("dev"));

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type, x-access-token');
  next();
});

apiRoutes.use('/auth', authRoutes); // localhost:8080/api/auth (no check token)

// Check JWT
apiRoutes.use((req, res, next) => {
  
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({ 
      success: false, 
      message: 'No token provided.' 
    });
  }
});
apiRoutes.use('/users', usersRoutes); // localhost:8080/api/users
app.use('/api', apiRoutes); //URL prefix

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '8080';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
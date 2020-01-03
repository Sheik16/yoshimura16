const express                  = require('express');
const morgan                   = require('morgan');
const path                     = require('path');
const helmet                   = require('helmet');
const fs                       = require('fs');
const app                      = express();
var bodyParser                 = require("body-parser");
var cookieSession              = require('cookie-session');

require('dotenv').config();


app.use(cookieSession({
	  name: 'session',
	  keys: ['insightLabor', 'in-sightlab'],
	  httpOnly: true
}))

// app.use(helmet());
// app.use(helmet.noCache());
// app.use(helmet.frameguard({
// 	  action: "allow-from", 
// 	  domain: url
// }));
  
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));


// Setup logger
 app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
 app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
 app.get('*', function (req, res) {
   res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
   });

module.exports = app;

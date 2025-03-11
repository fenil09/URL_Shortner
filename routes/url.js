
const express = require('express');
const application = express();
const path = require('path');
application.set('view engine',"ejs");
application.set('views', path.resolve('./views'));
const controllerhelp = require('../controllers/url');

application.use(express.json());
// We need a middleware to parse the data coming from the form we created.
application.use(express.urlencoded({extended: false}))


// This route would be helping us to get the shortID and enter it inside the database.
application.post('/url',controllerhelp.GenerateshortURL);
application.get("/",controllerhelp.handleEJSRendering);
// This would be matching the shortID which is present in the url provided by the user and then performing the redirect logic.
application.get("/favicon.ico", (req, res) => res.status(204).end());
application.get('/url/:shortId',controllerhelp.HandleRedirect);
// This route would be helping us to get the analytics over a URL, helping us to know how many times a URL was clicked and the timestamps as well.
application.get('/url/analytics/:shortId',controllerhelp.GetAnalytics);

module.exports = application;



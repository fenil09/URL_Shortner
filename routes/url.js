
const express = require('express');
const application = express();

const controllerhelp = require('../controllers/url');

application.use(express.json());

// This route would be helping us to get the shortID and enter it inside the database.
application.post('/url',controllerhelp.GenerateshortURL);
// This would be matching the shortID which is present in the url provided by the user and then performing the redirect logic.
application.get('/:shortId',controllerhelp.HandleRedirect);
// This route would be helping us to get the analytics over a URL, helping us to know how many times a URL was clicked and the timestamps as well.
application.get('/url/analytics/:shortId',controllerhelp.GetAnalytics);

module.exports = application;
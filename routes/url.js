
const express = require('express');
const application = express();

const controllerhelp = require('../controllers/url');

application.use(express.json());

application.post('/url',controllerhelp.GenerateshortURL);
application.get('/:shortId',controllerhelp.HandleRedirect);
application.get('/url/analytics/:shortId',controllerhelp.GetAnalytics);

module.exports = application;
const express = require('express');
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');


const routes = express.Router();

routes.get('/dev', DevController.index)
routes.post('/devs', DevController.store);
routes.post('dev/:devId/dislikes', DislikeController.store);
routes.post('dev/:devId/likes', LikeController.store);

module.exports = routes;
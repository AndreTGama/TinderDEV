const express = require('express');

const routes = express.Router();

routes.get('/',(req, res) => {
    return res.send(`hello ${req.query.name}`);
});

routes.post('/devs', (req,res) => {
    req.body
    return res.json({ok:true})
})
module.exports = routes;
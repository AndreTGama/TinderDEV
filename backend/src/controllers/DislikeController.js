const Dev = require('../models/Dev');
module.exports = {
   async store(req, res) {

        const {devId} = req.params;
        const {user} = req.header;

        const loggerDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if(!targetDev){
            return res.status(400).json({error: 'Dev não existe'});
        }

        loggerDev.dislikes.push(targetDev._id);

        await loggerDev.save();

        return res.json(loggerDev);
    }
};
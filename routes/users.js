let NeDB = require('nedb');
let db = new NeDB({
    filename: 'users.db',
    autoload: true
});

module.exports = (app) => {

    app.get('/users', (req, res) => {

        db.find({}).sort({name:1}).exec((err, users) =>{
            if(err){
                res.status(400).json({ error: err});
            }
            else {
                res.status(200).json({ users });
            }
        });
    });


    app.post('/users', (req, res) => {

        db.insert(req.body, (err, user) => {
            if(err){
                res.statusCode(400).json({
                    error: err
                });
            }

            else{
                    res.status(200).json(user);
                }
        })
    });
};
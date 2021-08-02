'use strict';

const mongoose = require('mongoose');
const app = require('./app');

const port = 3700;
const user = 'ali';
const psw = 'ali123';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://' + user + ':' + psw + '@localhost:27017/portafolio?authSource=admin')
.then(() => {
    console.log('connection success');
    app.listen(port, () => {
        console.log('Server on port :' + port);
    });
})
.catch((err)=>{
    console.log(err);
})
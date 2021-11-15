const express = require('express');
const app = express();
const mongoose = require('mongoose');
const auth_router = require('./routes/auth');
const events_router = require('./routes/events');
const cors = require('cors');
const db = require('./config/keys').mongodb;
app.use(express.json());
app.use(express.json());
app.use(express.static('public'));
app.use(cors());
app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });
mongoose.connect(db.DBURL,{useNewUrlParser: true, useUnifiedTopology: true}).
then().catch(err=>console.log(err));
mongoose.connection.once('open', ()=>console.log('it works fine'));


app.get('/', (req, res) => {
    return res.send('hello');
});
app.use('/auth', auth_router);
app.use('/events', events_router);
app.listen(5000, ()=>console.log('the server is ON'));
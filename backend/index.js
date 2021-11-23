const express = require('express');
const app = express();
const mongoose = require('mongoose');
const auth_router = require('./routes/auth');
const events_router = require('./routes/events');
const cors = require('cors');
const db = require('./config/keys').mongodb;
const morgan = require('morgan');
app.use(express.json());
app.use(express.json());
app.use(express.static('public'));
app.use(cors());
app.use(morgan('combined'));

mongoose.connect(db.DBURL,{useNewUrlParser: true, useUnifiedTopology: true}).
then().catch(err=>console.log(err));
mongoose.connection.once('open', ()=>console.log('it works fine'));


app.get('/', (req, res) => {
    return res.send('hello');
});
app.use('/auth', auth_router);
app.use('/events', events_router);
app.listen(5000, ()=>console.log('the server is ON'));
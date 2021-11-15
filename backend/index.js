const express = require('express');
const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    return res.send('hello');
});
app.listen(5000, ()=>console.log('the server is ON'));
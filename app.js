const express = require("express");
const app = express();
const dbconnect = require('./config/dbconnect');
const router = require('./routes/index');
const port = process.env.PORT || 3001;

app.use(express.json());

dbconnect();

app.use('/', router);

app.listen(port, () => {
    console.log(`El servidor esta escuchando en el puerto ${port}`);
})
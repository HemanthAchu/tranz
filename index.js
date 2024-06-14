const express = require('express');
const cors =require('cors')
require('dotenv').config()
const bodyParser = require('body-parser');
const routers =require('./router/router')
require('./DB/connetion')

const app = express();
app.use(bodyParser.json());
app.use(express.json())
app.use(cors())
app.use(routers)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
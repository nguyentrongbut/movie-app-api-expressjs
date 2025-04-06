const express = require('express');
const cors = require('cors');
const database = require('./config/database');
require('dotenv').config();

const routersAdminApiVer1 = require("./api/v1/routes/admin/index.route");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

database.connect()

// Router version 1
routersAdminApiVer1(app)

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})
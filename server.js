const express = require("express");
const cors = require('cors');
const compression = require("compression");
const helmet = require("helmet");
const routes = require("./routes");

const {port} = require('./globals');


const app = express();
app.set("port", port);


app.use(compression());
app.use(helmet());
app.use(cors());

app.use('/', routes);

app.listen(port, () => console.log(`Server running on localhost:${port}`));
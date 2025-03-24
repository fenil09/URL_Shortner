
const app = require('./routes/url');
const port = 8001;
app.listen(port);
const connectmongodb = require("./connection");
connectmongodb();






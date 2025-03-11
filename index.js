
const port = 8001;
const app = require('./routes/url');



app.listen(port);
const connectmongodb = require("./connection");
connectmongodb();






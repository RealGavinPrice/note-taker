const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const { clog } = require('./middleware/clog');
const api = require('./routes/api/index');
const html = require('./routes/html/index');


// Import custom middleware, "cLog"
app.use(clog);

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());





app.use('/api', api);
app.use('/', html);


app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}!`)
});

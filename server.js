const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const { clog } = require('./middleware/clog');
const api = require('./routes/api/index');
const html = require('./routes/html/index');




app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Import custom middleware, "cLog"
app.use(clog);



app.use('/api', api);
app.use('/', html);

// Import custom middleware, "cLog"
app.use(clog);




app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}!`)
});

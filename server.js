const express = require('express');
const path = require('path');
const api = require('./routes/notes');



const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/', api);
// app.use('/notes', api);


// route for home page
app.get('/', (req,res) =>{
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

//route for notes page
app.get('/notes', (req,res) =>{
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

//wildcard to the homepage
// app.get('*', (req,res) =>{
//   res.sendFile(path.join(__dirname, '/public/wildcard.html'))
// });

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);

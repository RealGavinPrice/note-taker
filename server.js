const express = require('express');
const path = require('path');
const api = require('./public/js/index.js');


const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use('/api/notes', api);

app.use(express.static('public'));

// route for home page
app.get('/', (req,res) =>{
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

//route for notes page
app.get('/notes', (req,res) =>{
  res.sendFile(path.join(__dirname, '/public/pages/notes.html'))
});

//wildcard to the homepage
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);

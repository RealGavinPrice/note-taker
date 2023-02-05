const express = require('express');

const router = require('express').Router();
const path = require('path');
const { readFromFile, writeToFile, readAndAppend } = require('../helper/fsUtils');

const { json } = require('express');
const database =require('../public/db/db.json');
const uuid = require('../helper/uuid');



const app = express();

app.use('/api', router);


// get route for notes page
router.get('/api/', (req, res) => {
    console.info(`${req.method} request received for notes`)
    readFromFile('./public/db/db.json').then((data) => res.json(JSON.parse(data)))
});

// get route for note ids
router.get('/api/:noteId', (req,res) => {
    const noteid = req.params.note_id;
    console.log(noteid);
    readFromFile('./public/db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        console.log(json)
        const result = json.filter((note) => note.note_id === note_id)
        return result.length > 0 ? res.json(result) : res.json('Cannot find your note. Please choose a valid ID.')
    });
});

// delete notes route
router.delete('/api/:noteId', (req,res) => {
    const noteid = req.params.note_id;
    readFromFile('./public/db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((note) => note.note_id !== noteid)
        fsUtils.writeToFile('./public/db/db.json', result)
        res.json(`Note ${noteid} has been removed.`)
    });
});

// post notes route
router.post ('/api', (req,res) => {
    console.log(`${req.method} request has been received.`);
    const { title, text, noteid } = req.body;
    if (title & text & noteid) {
        const newNote = {
            text,
            title,
            noteid : uuid() 
        };
    readAndAppend(newNote, './public/db/db.json');
    res.json(`Note added successfully 🧩 `);
  } else {
    res.error("Error with adding note 🎹");
  }
});


module.exports = router;


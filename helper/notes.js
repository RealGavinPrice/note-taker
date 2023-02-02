const notes = require('express').Router();
const uuid = require('../helper/uuid');
const database =require('../db/db.json');
const path = require('path');
const fsUtils = require('./fsUtils');
const { json } = require('express');

// get route for notes page
notes.get('/', (req, res) => {
    fsUtils.readFromFile(database).then((data) => res.json(JSON.parse(data)))
});

// get route for note ids
notes.get('/:note_id', (req,res) =>{
    const noteid = req.params.note_id;
    console.log(noteid);
    fsUtils.readFromFile(database)
    .then((data) => JSON.parse(data))
    .then((json) => {
        console.log(json)
        const result = json.filter((note) => note.note_id === note_id)
        return result.length > 0 ? res.json(result) : res.json('Cannot find your note. Please choose a valid ID.')
    });
});

// delete notes route
notes.delete('/:note_id', (req,res) => {
    const noteid = req.params.note_id;
    fsUtils.readFromFile(database)
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((note) => note.note_id !== noteid)
        fsUtils.writeToFile(database, result)
        res.json(`Note ${noteid} has been removed.`)
    });
});

// post notes route
notes.post ('/', (req,res) => {
    console.log(`${req.method} request has been received.`)
    const { text, title } = req.body
    if (text && title) {
        const newNote = {
            text,
            title,
            noteid : uuid() 
        }
    readAndAppend(newNote, database);
    res.json(`Note added successfully 🧩 `);
  } else {
    res.error('Error in adding note . . 🎹 ');
  }
});

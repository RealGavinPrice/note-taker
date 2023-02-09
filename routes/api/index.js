const router = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../../helpers/fsUtils');
// const { updateDatabase, createNewNote } = require('../../helpers/notes');
const fs = require('fs');
// const express = require('express');
const { json } = require('express');
const { v4: uuidv4 } = require('uuid');
const database  = require("../../db/db.json");
const { error } = require('console');
// const { database } = require("../../public/db/db.json");






// const app = express();



// get route for notes page
router.get('/notes', (req, res) => {
    console.info(`${req.method} request received for all notes`)
    let results = database;
    res.json(results)
    // readFromFile("../db/db.json").then((data) => res.json(JSON.parse(data)))
});

// post notes route
router.post ('/notes', (req,res) => {
    console.log(`${req.method} request has been received for a new note`);
    req.body.id = uuidv4();
    console.log (req.body);
    let content = req.body;
    const newNote = readAndAppend(content, "/Users/emily/bootcamp/11-Express/02-Challenge/db/db.json");
    res.json(newNote);
//     let { title, text, id } = req.body;
//     if (title & text & id) {
//         const newNote = {
//             text,
//             title,
//             id : { v4: uuidv4 } 
//         };
//         console.log(req.body);
//     readAndAppend(newNote, "../../db/db.json");
//     res.json(`Note added successfully 🧩 `);
//   } else {
//     res.json("Error with adding note 🎹");
//   }
});

// get route for note ids
router.get('/notes/:noteid', (req,res) => {
    const noteid = req.params.id;
    console.log(noteid);
    readFromFile("../../db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
        console.log(json)
        const result = json.filter((note) => note.id === noteid)
        return result.length > 0 ? res.json(result) : res.json('Cannot find your note. Please choose a valid ID.')
    });
});

// delete notes route
router.delete('/notes/:noteid', (req,res) => {
    const noteid = req.params.note_id;
    readFromFile("../../db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((note) => note.note_id !== noteid)
        writeToFile("../../db/db.json", result)
        res.json(`Note ${noteid} has been removed.`)
    });
});




module.exports = router;










// const router = require('express').Router();
// const {createNote, updateDatabase} = require("../../helpers/notes");
// const { v4: uuidv4 } = require('uuid');
// const {notes} = require("../../db/db.json");

// // show all notes in json data
// router.get("/notes", (req, res) => {
//     let results = notes;
//     res.json(results);
//   });

//   router.post("/notes", (req, res) => {
//     req.body.id = uuidv4();
//     const newNote = createNote(req.body, notes);
//     res.json(newNote);
//   });  

//   router.delete("/notes/:id" , (req, res) => {
//     const params = req.params.id
//     updateDatabase(params, notes);
//     res.redirect('');
//   });

//   module.exports = router;
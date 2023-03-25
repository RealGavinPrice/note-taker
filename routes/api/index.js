
const router = require('express').Router();
const {createNewNote, updateDatabase} = require("../../helpers/notes");
const { v4: uuidv4 } = require('uuid');
const {notes} = require("../../db/db.json");

// show all notes in json data
router.get('/', (req, res) => {
    let results = notes;
    res.json(results);
  });

  router.post('/', (req, res) => {
    req.body.id = uuidv4();
    const newNote = createNewNote(req.body, notes);
    res.json(newNote);
  });  

  router.delete('/:id' , (req, res) => {
    const params = req.params.id
    updateDatabase(params, notes);
    res.redirect('');
  });

  module.exports = router;
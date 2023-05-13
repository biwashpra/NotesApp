const { Router } = require("express");
const {
  saveNote,
  updateNote,
  deleteNote,
  getNotesList,
} = require("../controller/notesControl");
const notesRoute = Router();

notesRoute.get("/getNotesList", getNotesList);
notesRoute.post("/saveNote", saveNote);
notesRoute.post("/updateNote", updateNote);
notesRoute.post("/:id", deleteNote);
module.exports = notesRoute;

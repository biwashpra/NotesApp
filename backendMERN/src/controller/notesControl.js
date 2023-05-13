const notes = require("../model/notesModel");
require("../DB/database");

//get all todoLists from database
module.exports.getNotesList = async (req, res) => {
  const note = await notes.find();
  res.status(200).send({ data: note });
};

//add a new todo
module.exports.saveNote = async (req, res) => {
  const { title, description } = req.body;

  try {
    const newNote = new notes({ title, description });
    await newNote.save();
    console.log("Notes saved");
    return res.status(200).send({ message: "Notes saved successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Failed to add Notes!!!" });
  }
};

//update the todo
module.exports.updateNote = async (req, res) => {
  const { _id, title, description } = req.body;

  try {
    await notes.findByIdAndUpdate(_id, { title, description });
    console.log("Updated notes list");
    return res.status(201).send({ message: "Notes Updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Failed to update Notes!!!" });
  }
};

//delete the todo
module.exports.deleteNote = async (req, res) => {
  const _id = req.params.id;
  console.log(_id);

  try {
    await notes.findByIdAndDelete(_id);
    console.log("Deleted notes list");
    return res.status(200).send({ message: "Notes deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Failed to delete Notes!!!" });
  }
};

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SingleNote from "./components/SingleNote";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getData } from "./utils/CustomApi";
import DeleteModel from "./components/DeleteModel";
const App = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [Id, setId] = useState("");
  const [notes, setNotes] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  const [open, setOpen] = useState(false);

  //get all notes from DB
  useEffect(() => {
    getData(setNotes);
  }, [setNotes]);

  const baseURL = "http://localhost:5000";

  //Add Notes data
  const saveNote = () => {
    axios
      .post(`${baseURL}/saveNote`, {
        title: title,
        description: description,
      })
      .then((response) => {
        console.log(response);
        setTitle("");
        setDescription("");
        getData(setNotes);
        toast.success("📒 Note added successfully!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Update Notes data
  const updateNote = (_id, title, description) => {
    setIsUpdate(true);
    setTitle(title);
    setDescription(description);
    setId(_id);
  };
  const realUpdate = useCallback(() => {
    axios
      .post(`${baseURL}/updateNote`, {
        _id: Id,
        title: title,
        description: description,
      })
      .then((response) => {
        console.log(response);
        setTitle("");
        setDescription("");
        setIsUpdate(false);
        getData(setNotes);
        toast.info("📝 Note updated successfully!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [title, description]);

  //Delete Notes data
  const deleteNote = (id) => {
    console.log(id);
    axios
      .post(`${baseURL}/${id}`)
      .then((response) => {
        console.log(response);
        getData(setNotes);
        toast.warn("🗒️ Note deleted!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="bg-gray-500">
        <div className=" flex flex-col items-center">
          <h1 className=" text-4xl m-16 font-bold bg-orange-400 p-5 rounded-xl justify-center">
            Notes App
          </h1>
          <div className=" flex flex-col" method="POST">
            <input
              className=" bg-slate-100 rounded-md p-4 m-4 border-2 border-orange-400 font-semibold font-mono outline-none"
              type="text"
              placeholder="Notes title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              name="desc"
              id="des"
              cols="30"
              rows="10"
              className=" bg-slate-100 rounded-md p-4 m-4 border-2 border-orange-400 font-semibold font-mono outline-none"
              placeholder="Create your description notes"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button
              className=" bg-green-500 text-white p-3 m-4 text-2xl rounded-md font-bold hover:bg-green-600 font-mono"
              onClick={isUpdate ? realUpdate : saveNote}
            >
              {isUpdate ? "Update" : "ADD-Notes"}
            </button>
          </div>
        </div>
      </div>

      {/* className="overflow-y-scroll max-h-[600px] py-8" */}
      <div className="mx-auto">
        <div className="flex-row p-6 justify-center">
          {notes.map((item) => (
            <SingleNote
              key={item._id}
              title={item.title}
              description={item.description}
              createdAt={item.createdAt}
              updatedAt={item.updatedAt}
              updateNote={() =>
                updateNote(item._id, item.title, item.description)
              }
              // deleteNote={() => deleteNote(item._id)}
              deleteNote={() => {
                setOpen(true);
                setId(item._id);
              }}
            />
          ))}
        </div>
      </div>
      <DeleteModel
        open={open}
        setOpen={setOpen}
        deleteNote={() => deleteNote(Id)}
      />
      <ToastContainer />
    </>
  );
};

export default App;

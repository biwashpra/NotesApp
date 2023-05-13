import axios from "axios";

const getData = async (setNotes) => {
  try {
    axios({
      method: "get",
      url: "http://localhost:5000/getNotesList",
    }).then((response) => {
      console.log(response.data.data);
      setNotes(response.data.data);
    });
  } catch (error) {
    console.log(error);
    alert("Database error");
  }
};

export { getData };

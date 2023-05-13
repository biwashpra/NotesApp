const express = require("express");
const connectDB = require("./src/DB/database");
const cors = require("cors");
require("dotenv").config();

const routes = require("./src/routes/notesRoute");
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`App listening on: ${PORT}`);
});

app.use(routes);

app.get("/", (req, res) => {
  res.json({
    message: "Modern Notes App for Intern",
  });
});

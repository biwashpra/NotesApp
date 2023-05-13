const mongoose = require("mongoose");
const debug = require("debug");
mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const con = mongoose.connection;
    console.log(`mongoDB connected at: ${con.port}`);

    con.on("connected", () => {
      debug("mongodb connected");
    });
    con.on("error", (err) => {
      debug(`connection error ${err}`);
    });
    con.on("disconnected", () => {
      debug("mongodb disconnected");
    });
    return con;
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;

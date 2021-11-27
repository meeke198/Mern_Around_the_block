const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const express = require("express");
const app = express();
//3-4: creates a new Express server
const users = require("./routes/api/users");
const friendrequests = require("./routes/api/friend-requests");
const events = require("./routes/api/events");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");


if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}


mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require("./config/passport")(passport);

// app.get("/", (req, res) => res.send("Hello World"));
app.use("/api/users", users);
app.use("/api/friend-requests", friendrequests);
app.use("/api/events", events);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
//37-38: Before we can run the server, we need to tell our app which port to run on
//deploying our app to Heroku requires run our server on process.env.PORT.
require("dotenv").config();
const express = require("express"); const app = express();
const db = require("./db/db");
const authApi = require("./routes/authApi");
const migration = require("./db/migration");

app.use(express.json());

db.connect(error => {
    if (error) console.log(error);
});

app.use("/api", authApi);
app.use("/db", migration);

app.listen(3001, () => console.log("Listening on port 3001"));
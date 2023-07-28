require("dotenv").config();
const express = require("express"); const app = express();
const Router = express.Router();
const authApi = require("./routes/authApi");

app.use(express.json());
app.use("/api", authApi);

app.listen(3001, () => console.log("Listening on port 3001"));
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const apiRoutes = require("./src/routes/apiRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.URI).then((con) => {
  console.log("database connection succesfull");
});

app.get("/", (req, res) => {
  res.json("Server is running!");
});

app.use("/bfhl", apiRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

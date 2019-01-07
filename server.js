// /summary post request gets text to summarize and runs the python script and responds with the summarized text
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { PythonShell } = require("python-shell");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/summary", (req, res) => {
  // let { inputText } = req.body;
  // console.log(inputText);
  // res.status(200).send("Success");

  let options = {
    args: [2, 3]
  };

  PythonShell.run("main.py", options, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("results", result);
  });

  res.status(200).send("Success");
});

app.listen(4000, () => {
  console.log("Server started at http://localhost:4000");
});

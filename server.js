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
  res.send("It's working");
});

app.post("/summary", (req, res) => {
  let { inputText } = req.body;
  let { numSentences } = req.body;

  let options = {
    args: [inputText, numSentences]
  };

  PythonShell.run("setup.py", options, (error, result) => {
    if (error) {
      throw error;
    }
    let summary = result[1];
    res.json(summary);
  });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});

const express = require("express");
const app = express();
const port = 5000;
const db = require("../db/champions");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("<h1>League of Legends API</h1>"));
app.get("/champions", (req, res) => {
  let { start, offset } = req.query;
  start = isNaN(start) ? 0 : parseInt(start);
  offset = isNaN(offset) ? undefined : start + parseInt(offset);

  db.get(res, start, offset);
});

app.get("/champions/:nameOrKey", (req, res) => {
  let { nameOrKey } = req.params;

  if (isNaN(nameOrKey)) {
    db.getByName(res, nameOrKey);
  } else {
    db.getByKey(res, nameOrKey);
  }
});

app.post("/champions", (req, res) => {
  let data = req.body;
  db.insert(res, data);
});

app.patch("/champions", (req, res) => {
    let data = req.body;
    db.update(res, data);
});

app.delete("/champions", (req, res) => {
  let { nameOrKey } = req.body;
  if (isNaN(nameOrKey)) {
    db.deleteByName(res, nameOrKey);
  } else {
    db.deleteByKey(res, nameOrKey);
  }
});

app.get("/champions/types/:type", (req, res) => {
    let { type } = req.params;
    db.getByType(res, type);
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const express = require("express");
const app = express();
const port = 5000;
const cors = require('cors');
const db = require("../db/champions");
const bodyParser = require("body-parser");

app.use(cors({origin: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("<h1>League of Legends API</h1>"));
app.get("/api/v1/champions", (req, res) => {
  let { start, offset } = req.query;
  start = isNaN(start) ? 0 : parseInt(start);
  offset = isNaN(offset) ? undefined : start + parseInt(offset);

  db.get(res, start, offset);
});

app.get("/api/v1/champions/:nameOrKey", (req, res) => {
  let { nameOrKey } = req.params;

  if (isNaN(nameOrKey)) {
    db.getByName(res, nameOrKey);
  } else {
    db.getByKey(res, nameOrKey);
  }
});

app.post("/api/v1/champions", (req, res) => {
  let data = req.body;
  db.insert(res, data);
});

app.patch("/api/v1/champions", (req, res) => {
    let data = req.body;
    db.update(res, data);
});

app.delete("/api/v1/champions", (req, res) => {
  let { nameOrKey } = req.body;
  if (isNaN(nameOrKey)) {
    db.deleteByName(res, nameOrKey);
  } else {
    db.deleteByKey(res, nameOrKey);
  }
});

app.get("/api/v1/champions/types/:type", (req, res) => {
    let { type } = req.params;
    db.getByType(res, type);
})


//exports.widgets = functions.https.onRequest(app);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

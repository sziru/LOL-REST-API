const admin = require("firebase-admin");

const serviceAccount = require("../lol-champions-8f375-firebase-adminsdk-nmb6k-2e78250bc6.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lol-champions-8f375.firebaseio.com"
});

const db = admin.database();

class Champions {
  get(res, start, offset) {
    return db
      .ref("champions")
      .orderByChild("key")
      .once(
        "value",
        snapshot => {
          const rows = [];
          snapshot.forEach(child => {
            rows.push({ ...child.val(), d_id: child.key });
          });
          let result = rows.reverse().slice(start, offset);
          res.send(result);
        },
        err => {
          throw err;
        }
      );
  }

  getByName(res, name) {
    return db
      .ref("champions")
      .orderByChild("id")
      .equalTo(name)
      .once(
        "value",
        snapshot => {
          res.status = "success";
          const row = [];
          snapshot.forEach(child => {
            row.push({ ...child.val(), d_id: child.key });
          });
          res.send(row);
        },
        err => {
          throw err;
        }
      );
  }

  getByKey(res, key) {
    return db
      .ref("champions")
      .orderByChild("key")
      .equalTo(key)
      .once(
        "value",
        snapshot => {
          const row = [];
          snapshot.forEach(child => {
            row.push({ ...child.val(), d_id: child.key });
          });
          res.status = "success";
          res.statusCode = 200;
          res.send(row);
        },
        err => {
          throw err;
        }
      );
  }

  getByType(res, type) {
    return db
      .ref("champions")
      .orderByChild("key")
      .once(
        "value",
        snapshot => {
          const row = [];

          snapshot.forEach(child => {
            let hasType = child
              .val()
              .tags.map(tag => tag.toLowerCase())
              .includes(type.toLowerCase());
            if (hasType) {
              row.push({ ...child.val(), d_id: child.key });
            }
          });
          res.status = "success";
          res.statusCode = 200;
          res.send(row);
        },
        err => {
          throw err;
        }
      );
  }

  update(res, data) {
    const key = data.d_id;
    delete data.d_id;
    return db
      .ref("champions/" + key)
      .update(data)
      .then(() => {
        res.status = "success";
        res.statusCode = 200;
        res.send(res.status);
      })
      .catch(err => {
        res.status = "failed";
        throw err;
      });
    }
    
    insert(res, data) {
      return db
      .ref("champions")
      .push(data)
      .then(() => {
        res.status = "success";
        res.statusCode = 201;
        res.send(res.status)
      })
      .catch(err => {
        throw err;
      });
  }

  deleteByName(res, id) {
    return db
      .ref("champions")
      .orderByChild("id")
      .equalTo(id)
      .once(
        "value",
        snapshot => {
          res.status = "success";
          res.statusCode = 200;
          const row = [];
          snapshot.forEach(child => {
            row.push(child.key);
          });
          return Promise.all(
            row.map(id => {
              return db.ref("champions/" + id).remove();
            })
          )
            .then(() => {
              res.status = "success";
              res.statusCode = 200;
              res.send(res.status);
            })
            .catch(err => {
              res.status = "failed";
              throw err;
            });
        },
        err => {
          throw err;
        }
      );
  }

  deleteByKey(res, key) {
    return db
      .ref("champions")
      .orderByChild("key")
      .equalTo(key)
      .once(
        "value",
        snapshot => {
          res.status = "success";
          res.statusCode = 200;
          const row = [];
          snapshot.forEach(child => {
            row.push(child.key);
          });
          return Promise.all(
            row.map(id => {
              return db.ref("champions/" + id).remove();
            })
          )
            .then(() => {
              res.status = "success";
              res.statusCode = 200;
              res.send(res.status);
            })
            .catch(err => {
              res.status = "failed";
              throw err;
            });
        },
        err => {
          throw err;
        }
      );
  }

}

module.exports = new Champions();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

const enableCORS = (req, res, next) => {
  console.log("HERE");
  if (!process.env.DISABLE_XORIGIN) {
    const allowedOrigins = [
      "https://marsh-glazer.gomix.me",
      "https://narrow-plane.gomix.me",
      "https://www.freecodecamp.com",
    ];
    const origin = req.headers.origin;
    if (!process.env.XORIGIN_RESTRICT || allowedOrigins.indexOf(origin) > -1) {
      console.log(req.method);
      res.set({
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      });
    }
  }
  next();
};

// Files for the homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.use("/", express.static(path.join(__dirname, "public")));

router.get("/file/*?", (req, res, next) => {
  if (req.params[0] === ".env")
    return next({ status: 401, message: "ACCESS DENIED" });
  fs.readFile(path.join(__dirname, req.params[0]), (err, data) => {
    if (err) return next(err);
    res.type("txt").send(data.toString());
  });
});

router.get("/is-mongoose-ok", (req, res) => {
  if (mongoose)
    return res.json({ isMongooseOk: !!mongoose.connection.readyState });
  res.json({ isMongooseOk: false });
});

// global setting for safety timeouts to handle possible
// wrong callbacks that will never be called
const timeout = 10_000;

// Testing the Person model
const Person = require("./myApp.js").PersonModel;

router.use((req, res, next) => {
  if (req.method !== "OPTIONS" && Person.modelName !== "Person")
    return next({ message: "Person Model is not correct" });
  next();
});

router.post("/mongoose-model", (req, res, next) => {
  // try to create a new instance based on their model
  // verify it's correctly defined in some way
  const p = new Person(req.body);
  res.json(p);
});

const createPerson = require("./myApp.js").createAndSavePerson;

router.get("/create-and-save-person", (req, res, next) => {
  // in case of incorrect function use wait timeout then respond
  let t = setTimeout(() => next({ message: "timeout" }), timeout);
  createPerson((err, data) => {
    clearTimeout(t);
    if (err) return next(err);
    if (!data) {
      console.log("Missing `done()` argument");
      return next({ message: "Missing callback argument" });
    }
    Person.findById(data._id, (err, pers) => {
      if (err) return next(err);
      res.json(pers);
      pers.remove();
    });
  });
});

const createPeople = require("./myApp.js").createManyPeople;
router.post("/create-many-people", (req, res, next) => {
  Person.remove({}, (err) => {
    if (err) return next(err);
    // in case of incorrect function use wait timeout then respond
    let t = setTimeout(() => next({ message: "timeout" }), timeout);
    createPeople(req.body, (err, data) => {
      clearTimeout(t);
      if (err) return next(err);
      if (!data) {
        console.log("Missing `done()` argument");
        return next({ message: "Missing callback argument" });
      }
      Person.find({}, (err, pers) => {
        if (err) return next(err);
        res.json(pers);
        Person.remove().exec();
      });
    });
  });
});

const findByName = require("./myApp.js").findPeopleByName;
router.post("/find-all-by-name", (req, res, next) => {
  const t = setTimeout(() => next({ message: "timeout" }), timeout);
  Person.create(req.body, (err, pers) => {
    if (err) return next(err);
    findByName(pers.name, (err, data) => {
      clearTimeout(t);
      if (err) return next(err);
      if (!data) {
        console.log("Missing `done()` argument");
        return next({ message: "Missing callback argument" });
      }
      res.json(data);
      Person.remove().exec();
    });
  });
});

const findByFood = require("./myApp.js").findOneByFood;
router.post("/find-one-by-food", (req, res, next) => {
  const t = setTimeout(() => next({ message: "timeout" }), timeout);
  const p = new Person(req.body);
  p.save((err, pers) => {
    if (err) return next(err);
    findByFood(pers.favoriteFoods[0], (err, data) => {
      clearTimeout(t);
      if (err) return next(err);
      if (!data) {
        console.log("Missing `done()` argument");
        return next({ message: "Missing callback argument" });
      }
      res.json(data);
      p.remove();
    });
  });
});

const findById = require("./myApp.js").findPersonById;
router.get("/find-by-id", (req, res, next) => {
  const t = setTimeout(() => next({ message: "timeout" }), timeout);
  const p = new Person({ name: "test", age: 0, favoriteFoods: ["none"] });
  p.save((err, pers) => {
    if (err) return next(err);
    findById(pers._id, (err, data) => {
      clearTimeout(t);
      if (err) return next(err);
      if (!data) {
        console.log("Missing `done()` argument");
        return next({ message: "Missing callback argument" });
      }
      res.json(data);
      p.remove();
    });
  });
});

const findEdit = require("./myApp.js").findEditThenSave;
router.post("/find-edit-save", (req, res, next) => {
  const t = setTimeout(() => next({ message: "timeout" }), timeout);
  const p = new Person(req.body);
  p.save((err, pers) => {
    if (err) return next(err);
    try {
      findEdit(pers._id, (err, data) => {
        clearTimeout(t);
        if (err) return next(err);
        if (!data) {
          console.log("Missing `done()` argument");
          return next({ message: "Missing callback argument" });
        }
        res.json(data);
        p.remove();
      });
    } catch (e) {
      console.log(e);
      return next(e);
    }
  });
});

const update = require("./myApp.js").findAndUpdate;
router.post("/find-one-update", (req, res, next) => {
  const t = setTimeout(() => next({ message: "timeout" }), timeout);
  const p = new Person(req.body);
  p.save((err, pers) => {
    if (err) return next(err);
    try {
      update(pers.name, (err, data) => {
        clearTimeout(t);
        if (err) return next(err);
        if (!data) {
          console.log("Missing `done()` argument");
          return next({ message: "Missing callback argument" });
        }
        res.json(data);
        p.remove();
      });
    } catch (e) {
      console.log(e);
      return next(e);
    }
  });
});

const removeOne = require("./myApp.js").removeById;
router.post("/remove-one-person", (req, res, next) => {
  Person.remove({}, (err) => {
    if (err) return next(err);
    const t = setTimeout(() => next({ message: "timeout" }), timeout);
    const p = new Person(req.body);
    p.save((err, pers) => {
      if (err) return next(err);
      try {
        removeOne(pers._id, (err, data) => {
          clearTimeout(t);
          if (err) return next(err);
          if (!data) {
            console.log("Missing `done()` argument");
            return next({ message: "Missing callback argument" });
          }
          console.log(data);
          Person.count((err, cnt) => {
            if (err) return next(err);
            data = data.toObject();
            data.count = cnt;
            console.log(data);
            res.json(data);
          });
        });
      } catch (e) {
        console.log(e);
        return next(e);
      }
    });
  });
});

const removeMany = require("./myApp.js").removeManyPeople;
router.post("/remove-many-people", (req, res, next) => {
  Person.remove({}, (err) => {
    if (err) return next(err);
    const t = setTimeout(() => {
      next({ message: "timeout" });
    }, timeout);
    Person.create(req.body, (err, pers) => {
      if (err) return next(err);
      try {
        removeMany((err, data) => {
          clearTimeout(t);
          if (err) return next(err);
          if (!data) {
            console.log("Missing `done()` argument");
            return next({ message: "Missing callback argument" });
          }
          Person.count((err, cnt) => {
            if (err) return next(err);
            if (data.ok === undefined) {
              // for mongoose v4
              try {
                data = JSON.parse(data);
              } catch (e) {
                console.log(e);
                return next(e);
              }
            }
            res.json({
              n: data.n,
              count: cnt,
              ok: data.ok,
            });
          });
        });
      } catch (e) {
        console.log(e);
        return next(e);
      }
    });
  });
});

const chain = require("./myApp.js").queryChain;
router.post("/query-tools", (req, res, next) => {
  const t = setTimeout(() => {
    next({ message: "timeout" });
  }, timeout);
  Person.remove({}, (err) => {
    if (err) return next(err);
    Person.create(req.body, (err, pers) => {
      if (err) return next(err);
      try {
        chain((err, data) => {
          clearTimeout(t);
          if (err) return next(err);
          if (!data) {
            console.log("Missing `done()` argument");
            return next({ message: "Missing callback argument" });
          }
          res.json(data);
        });
      } catch (e) {
        console.log(e);
        return next(e);
      }
    });
  });
});

app.use("/_api", enableCORS, router);

// Error handler
app.use((err, req, res, next) => {
  if (err)
    res
      .status(err.status || 500)
      .type("txt")
      .send(err.message || { 500: "SERVER ERROR" });
});

// Unmatched routes handler
app.use((req, res) => {
  if (req.method.toLowerCase() === "options") return res.end();
  res.status(404).type("txt").send({ 404: "File Not Found" });
});

// Listener
const listener = app.listen(process.env.PORT || 3001, "localhost", () => {
  const { address, port } = listener.address();
  console.log(`Server is listening at http://${address}:${port}`);
});

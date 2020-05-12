# Node server, Mongo & Mongoose

===============================

- A repository for the challenges in FCC.

## 1. Install and Set Up Mongoose

Add mongodb and mongoose to the project’s package.json. Then require mongoose. Store your MongoDB Atlas database URI in the private `.env` file as MONGO_URI. Surround the the URI with single or double quotes and make sure no space exists between both the variable and the `=` and the value and `=`. Connect to the database using the following syntax:

```node
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
```

## 2.

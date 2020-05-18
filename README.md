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

## 2. Create a Model

CRUD Part I - CREATE

First of all we need a Schema. Each schema maps to a MongoDB collection. It defines the shape of the documents within that collection. Schemas are building block for Models. They can be nested to create complex models, but in this case we’ll keep things simple. A model allows you to create instances of your objects, called documents.

Glitch is a real server, and in real servers the interactions with the db happen in handler functions. These function are executed when some event happens (e.g. someone hits an endpoint on your API). We’ll follow the same approach in these exercises. The `done()` function is a callback that tells us that we can proceed after completing an asynchronous operation such as inserting, searching, updating or deleting. It’s following the Node convention and should be called as `done(null, data)` on success, or `done(err)` on error. Warning - When interacting with remote services, errors may occur!

```node
/* Example */

var someFunc = function (done) {
  //... do something (risky) ...
  if (error) return done(error);
  done(null, result);
};
```

## 3. Create and Save a Record of a Model

In this challenge you will have to create and save a record of a model.

Create a document instance using the `Person` constructor you built before. Pass to the constructor an object having the fields `name`, `age`, and `favoriteFoods`. Their types must conform to the ones in the Person Schema. Then call the method `document.save()` on the returned document instance. Pass to it a callback using the Node convention. This is a common pattern, all the following CRUD methods take a callback function like this as the last argument.

```node
/* Example */

// ...
person.save(function (err, data) {
  //   ...do your stuff here...
});
```

## 4. Create Many Records with model.create()

Sometimes you need to create many instances of your models, e.g. when seeding a database with initial data. `Model.create()` takes an array of objects like `[{name: 'John', ...}, {...}, ...]` as the first argument, and saves them all in the db.

Create many people with `Model.create()`, using the function argument `arrayOfPeople`.

## 5. Use model.find() to Search Your Database

Find all the people having a given name, using `Model.find() -> [Person]`

In its simplest usage, `Model.find()` accepts a query document (a JSON object) as the first argument, then a callback. It returns an array of matches. It supports an extremely wide range of search options. Check it in the docs. Use the function argument `personName` as search key.

## 6. Use model.findOne() to Return a Single Matching Document from Your Database

`Model.findOne()` behaves like `.find()`, but it returns only one document (not an array), even if there are multiple items. It is especially useful when searching by properties that you have declared as unique.

Find just one person which has a certain food in the person's favorites, using `Model.findOne() -> Person`. Use the function argument food as search key.

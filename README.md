# Node server, Mongo & Mongoose

====================================

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/estebmaister/mongoose?style=plastic) ![GitHub last commit](https://img.shields.io/github/last-commit/estebmaister/mongoose?style=plastic&logo=git&logoColor=white) [![Website](https://img.shields.io/website?up_message=online&url=https%3A%2F%2Fmongoose-esteb.glitch.me&logo=glitch&style=plastic)](https://mongoose-esteb.glitch.me/) ![License](https://img.shields.io/github/license/estebmaister/mongoose?style=plastic) [![Twitter Follow](https://img.shields.io/twitter/follow/estebmaister?label=Follow&style=social) ](https://twitter.com/estebmaister)

[![Workflow badge](https://github.com/estebmaister/mongoose/workflows/Glitch%20Sync/badge.svg)](https://github.com/Estebmaister/mongoose/blob/master/.github/workflows/main.yml) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](http://makeapullrequest.com)

- Created from the [FCC](https://freecodecamp.com) repository, to compile the lessons about MongoDB and Mongoose in NodeJS.

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F31OD9K)

Start with an empty repository and making the git init as follows:

```git
git init
git clone https://github.com/Estebmaister/mongoose.git
```

Adding the files from the original repo in FCC and start to coding.

## Scripts

To install all the dependencies :

```npm
npm install
```

To run the server

```node
node server.js
```

## Challenges

### Table of Contents

1. [Install and Set Up Mongoose](#1-install-and-set-up-mongoose)
1. [Create a Model](#2-create-a-model)
1. [Create and Save a Record of a Model](#3-create-and-save-a-record-of-a-model)
1. [Create Many Records with model.create()](#4-create-many-records-with-modelcreate)
1. [Use model.find() to Search Your Database](#5-use-modelfind-to-search-your-database)
1. [Use model.findOne() to Return a Single Matching Document from Your Database](#6-use-modelfindone-to-return-a-single-matching-document-from-your-database)
1. [Use model.findById() to Search Your Database By \_id](#7-use-modelfindbyid-to-search-your-database-by-_id)
1. [Perform Classic Updates by Running Find, Edit, then Save](#8-perform-classic-updates-by-running-find-edit-then-save)
1. [Perform New Updates on a Document Using model.findOneAndUpdate()](#9-perform-new-updates-on-a-document-using-modelfindoneandupdate)
1. [Delete One Document Using model.findByIdAndRemove](#10-delete-one-document-using-modelfindbyidandremove)
1. [](#11-)
1. [](#12-)

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

**[⬆ back to top](#table-of-contents)**

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

**[⬆ back to top](#table-of-contents)**

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

**[⬆ back to top](#table-of-contents)**

## 4. Create Many Records with model.create()

Sometimes you need to create many instances of your models, e.g. when seeding a database with initial data. `Model.create()` takes an array of objects like `[{name: 'John', ...}, {...}, ...]` as the first argument, and saves them all in the db.

Create many people with `Model.create()`, using the function argument `arrayOfPeople`.

**[⬆ back to top](#table-of-contents)**

## 5. Use model.find() to Search Your Database

Find all the people having a given name, using `Model.find() -> [Person]`

In its simplest usage, `Model.find()` accepts a query document (a JSON object) as the first argument, then a callback. It returns an array of matches. It supports an extremely wide range of search options. Check it in the docs. Use the function argument `personName` as search key.

**[⬆ back to top](#table-of-contents)**

## 6. Use model.findOne() to Return a Single Matching Document from Your Database

`Model.findOne()` behaves like `.find()`, but it returns only one document (not an array), even if there are multiple items. It is especially useful when searching by properties that you have declared as unique.

Find just one person which has a certain food in the person's favorites, using `Model.findOne() -> Person`. Use the function argument food as search key.

**[⬆ back to top](#table-of-contents)**

## 7. Use model.findById() to Search Your Database By \_id

When saving a document, mongodb automatically adds the field `_id`, and set it to a unique alphanumeric key. Searching by `_id` is an extremely frequent operation, so mongoose provides a dedicated method for it.

Find the (only!!) person having a given `_id`, using `Model.findById() -> Person`. Use the function argument `personId` as the search key.

**[⬆ back to top](#table-of-contents)**

## 8. Perform Classic Updates by Running Find, Edit, then Save

In the good old days this was what you needed to do if you wanted to edit a document and be able to use it somehow e.g. sending it back in a server response. Mongoose has a dedicated updating method : `Model.update()`. It is bound to the low-level mongo driver. It can bulk edit many documents matching certain criteria, but it doesn’t send back the updated document, only a ‘status’ message. Furthermore it makes model validations difficult, because it just directly calls the mongo driver.

Find a person by `\_id` ( use any of the above methods ) with the parameter `personId` as search key. Add "hamburger" to the list of the person's `favoriteFoods` (you can use `Array.push()`). Then - inside the find callback - `save()` the updated `Person`.

Note: This may be tricky, if in your Schema, you declared `favoriteFoods` as an Array, without specifying the type (i.e. `[String]`). In that case, `favoriteFoods` defaults to Mixed type, and you have to manually mark it as edited using `document.markModified('edited-field')`. See [Mongoose documentation](https://mongoosejs.com/docs/schematypes.html#Mixed)

**[⬆ back to top](#table-of-contents)**

## 9. Perform New Updates on a Document Using model.findOneAndUpdate()

Recent versions of mongoose have methods to simplify documents updating. Some more advanced features (i.e. pre/post hooks, validation) behave differently with this approach, so the Classic method is still useful in many situations. `findByIdAndUpdate()` can be used when searching by Id.

Find a person by `Name` and set the person's age to 20. Use the function parameter `personName` as search key.

Note: You should return the updated document. To do that you need to pass the options document `{ new: true }` as the 3rd argument to `findOneAndUpdate()`. By default these methods return the unmodified object.

**[⬆ back to top](#table-of-contents)**

## 10. Delete One Document Using model.findByIdAndRemove

Delete one person by the person's `_id`. You should use one of the methods `findByIdAndRemove()` or `findOneAndRemove()`. They are like the previous update methods. They pass the removed document to the db. As usual, use the function argument personId as the search key.

**[⬆ back to top](#table-of-contents)**

## 11.

**[⬆ back to top](#table-of-contents)**

## 12.

**[⬆ back to top](#table-of-contents)**

# Node server, Mongo & Mongoose

========================================

![GitHub package.json version][gh-pack-json-v] ![Package.json express version][gh-pack-json-dep-v-express] ![Package.json mongodb version][gh-pack-json-dep-v-mongodb] ![Package.json mongoose version][gh-pack-json-dep-v-mongoose] ![GitHub language count][language-count-bdg] ![GitHub top language][top-language-bdg] ![GitHub repo size][repo-size-bdg] ![GitHub code size in bytes][code-size-bdg] ![Last commit][last-commit-bdg] [![Website][website-bdg]][website] [![MIT License][license-bdg]][license] [![Twitter Follow][twitter-bdg]][twitter]

[![Workflow badge][workflow-bdg]][glitch-workflow] [![PRs Welcome][prs-bdg]][prs-site]

- Created from the [FCC](https://freecodecamp.com) repository, to compile the lessons about MongoDB and Mongoose in NodeJS.

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F31OD9K)

Start with an empty repository and making the git init as follows:

```git
git init
git clone https://github.com/Estebmaister/mongoose.git
```

Adding the files from the original repo in FCC and start to coding.

## Scripts

To install all the dependencies:

```npm
npm install
```

To run the server static

```node
npm start
```

To run the server with dynamic refresh

```node
npm run demon
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
1. [Delete Many Documents with model.remove()](#11-delete-many-documents-with-modelremove)
1. [Chain Search Query Helpers to Narrow Search Results](#12-chain-search-query-helpers-to-narrow-search-results)

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

## 11. Delete Many Documents with model.remove()

`Model.remove()` is useful to delete all the documents matching given criteria.

Delete all the people whose name is “Mary”, using `Model.remove()`. Pass it to a query document with the `name` field set, and of course a callback.

Note: The `Model.remove()` doesn’t return the deleted document, but a JSON object containing the outcome of the operation, and the number of items affected. Don’t forget to pass it to the `done()` callback, since we use it in tests.

**[⬆ back to top](#table-of-contents)**

## 12. Chain Search Query Helpers to Narrow Search Results

If you don’t pass the callback as the last argument to `Model.find()` (or to the other search methods), the query is not executed. You can store the query in a variable for later use. This kind of object enables you to build up a query using chaining syntax. The actual db search is executed when you finally chain the method `.exec()`. You always need to pass your callback to this last method. There are many query helpers, here we’ll use the most ‘famous’ ones.

Find people who like burrito. Sort them by name, limit the results to two documents, and hide their age. Chain `.find()`, `.sort()`, `.limit()`, `.select()`, and then `.exec()`. Pass the `done(err, data)` callback to `exec()`.

**Well Done !!**
You completed these challenges, let's go celebrate !

**[⬆ back to top](#table-of-contents)**

# Further Readings

If you are eager to learn and want to go deeper, You may look at :

- Indexes ( very important for query efficiency ),
- Pre/Post hooks,
- Validation,
- Schema Virtuals and Model, Static, and Instance methods,
- and much more in the [mongoose docs](http://mongoosejs.com/docs/)

# License

[MIT](https://choosealicense.com/licenses/mit/)

<!-- General links -->

[changelog]: ./CHANGELOG.md
[version-bdg]: https://img.shields.io/badge/version-1.0.0-blue.svg?style=plastic
[license]: ./LICENSE
[twitter]: https://twitter.com/estebmaister
[twitter-bdg]: https://img.shields.io/twitter/follow/estebmaister?label=Follow&style=social
[prs-bdg]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat
[prs-site]: (https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

<!-- Repo badges links -->

[license-bdg]: https://img.shields.io/github/license/estebmaister/mongoose?style=plastic
[last-commit-bdg]: https://img.shields.io/github/last-commit/estebmaister/mongoose?style=plastic&logo=git&logoColor=white
[language-count-bdg]: https://img.shields.io/github/languages/count/estebmaister/mongoose?style=plastic&logo=visual-studio-code
[top-language-bdg]: https://img.shields.io/github/languages/top/estebmaister/mongoose?style=plastic&logo=freecodecamp
[repo-size-bdg]: https://img.shields.io/github/repo-size/estebmaister/mongoose?style=plastic
[code-size-bdg]: https://img.shields.io/github/languages/code-size/estebmaister/mongoose?style=plastic
[gh-pack-json-v]: https://img.shields.io/github/package-json/v/estebmaister/boilerplate-express?color=blue&style=plastic&logo=github
[gh-pack-json-dep-v-express]: https://img.shields.io/github/package-json/dependency-version/estebmaister/boilerplate-express/express?style=plastic&logo=express
[gh-pack-json-dep-v-mongodb]: https://img.shields.io/github/package-json/dependency-version/estebmaister/mongoose/mongodb?style=plastic&logo=mongodb&logoColor=white
[gh-pack-json-dep-v-mongoose]: https://img.shields.io/github/package-json/dependency-version/estebmaister/mongoose/mongoose?style=plastic&logo=mongoose

<!-- Glitch web and workflow -->

[website]: https://mongoose-esteb.glitch.me
[website-bdg]: https://img.shields.io/website?down_color=violet&down_message=sleeping&label=servidor&logo=glitch&logoColor=white&style=plastic&up_color=green&up_message=online&url=https%3A%2F%2Fmongoose-esteb.glitch.me
[workflow-bdg]: https://github.com/estebmaister/mongoose/workflows/Glitch%20Sync/badge.svg
[glitch-workflow]: https://github.com/Estebmaister/mongoose/blob/master/.github/workflows/main.yml

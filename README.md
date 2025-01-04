# backend-nodejs

[Chapter 1 - Introduction to Node, NPM, Package.JSON](#Chapter-1-Notes)

[Chapter 2 - Server Concepts with Node - http module](#Chapter-2-Notes)

[Chapter 3 - Express JS](#Chapter-3-Notes)

[Chapter 4 - REST API using Express JS](#Chapter-4-Notes)

[Chapter 5 - Backend Directory Structure / MVC / Router](#Chapter-5-Notes)

[Chapter 6 - MongoDB - Server / Mongo Shell (CLI) / Mongo Atlas](#Chapter-6-Notes)

[Chapter 7 - Mongoose and REST APIs](#Chapter-7-Notes)

[Chapter 8 - Deploy Live](#Chapter-8-Notes)

## Chapter 1 - Introduction to Node, NPM, Package.JSON

### [Chapter 1 Notes]

- **Node JS** installation from official site nodejs.org - use only LTS versions
- Use **terminal / command prompt** to check installation :

```
  node -v
  npm -v
```

- Use VS code terminal to run **commands**
- **Node REPL** interface can be used directly by typing `node` in **terminal / command prompt** . Use **Ctrl+D** to exit interface. Use **CTRL+C** to exit terminal
- Running any JavaScript file from node using `node filename.js`
- **Modules** are basic containers in Node/JavaScript system. 1 file can be one module in Javascript.
- Two type of Module Systems in node JS are - **CommonJS** module and **ES** Modules.

**- CommonJS Module**

```javascript
//lib.js
exports.sum = function () {};

//index.js
const module = require("./lib.js");
module.sum();
```

**- ES Module**

```javascript
//lib.js
export { sum };

//index.js
import { sum } from "./lib.js";
```

- FileSystem Module(fs) is one of core modules of Node JS. **fs** can be used to read/write any file. There are many more core modules in NodeJS which you can check in NodeJS API docs.
- Reading files can be **Synchronous** or **Asynchronous**. **Async** is most preferred method in NodeJS. As there is **NO blocking of I/O in NodeJS**

- Node project can be initialized with `npm init` command which also creates `package.json` file
- **package.json** is a configuration file for node projects which has **scripts**, **dependencies**, **devDependencies** etc
- `npm install <package-name>` is used to install any online modules available for node on NPM repository online.
- `nodemon` is a package for running node server and track live changes to re-start again.

```
npm install nodemon
```

- `scripts` inside **package.json** can be used like `npm run <script-name>` e.g `npm run start`, `npm run dev`. Only for `npm start` you can avoid `run`.

```
//package.json file
"scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

- use `npm install -g <package.json>` to install packages globally on your system. Not just in the project but useful all over your system.

- Node versions are formatted like **^22.12.0** where these are `major.minor.patch` versions.

- `*` This can be used to change the `major` version
- `^` This can be used to change the `minor` version
- `~` This can be used to change the `patch` version only.

- you can install all dependencies again using `npm install` again
- **package-lock.json** has exact versions installed and link of dependencies of each package.
- use `npm update` to update packages safely. `npm outdated` shows outdated and latets versions of packages installed in your **package.json**
- use `npm uninstall <package-name>` to uninstall packages from `package.json`
- `node_modules` should not be shared - you can make `.gitignore`to ignore them to be uploaded.
- `npm outdated` can used to check the outdated packages

### [Assignments ]

- **Assignment 1** : If we delete `node_modules`. How to run our application again successfully ?
- **Assignment 2** : How to use command line arguments in Node JS. Like `node index.js 3 2` - how can I get 3 and 2 to be used in my programs. [ *Hint : search for command line arguments in node* ]
- **Assignment 3** : Explore the `os` module in Node Js from their documentation. What all info you can access from it about your operating system ?
- **Assignment 4** : Explore about **Asynchronous** nature of JS as a single threaded language and how it is achieved using **Event Loop**. Video are given below in related videos sections.
- **Assignment 5 [Challenge]** : Can you run a system command from Node JS javascript file e.g. `ls` `dir` commands ? and can you store its output in a text file ?

### Related Links/Videos

1. [Callbacks](https://youtu.be/rx-y7U4x4wc)
2. [Promises](https://youtu.be/aA4-VNZK2s0)
3. [Async Await](https://youtu.be/rdy8ZV0LXV0)
4. [Import/ Export example](https://youtu.be/7P5JUMc1cI4)
5. [Event Loop in Node JS](https://youtu.be/W-HQC_YUGBY)

## Chapter 2 - Server Concepts with Node - http module

### [[Chapter 2 Notes]]

#### HTTP requests

Request object comprises of many properties, but important ones are :

- **Type of Request** : GET, POST, PUT, DELETE etc.
- **Headers** : Meta data sent by your browser like browser name, cookies, authentication information etc.
- **Query Parameters** (url?`name=john`) : This is used in GET requests to send data to server
- **Route Params** (url/`john`)
- **Body data** : This is used in POST and other requests to send data to server

#### HTTP responses

Response object comprises of many properties, but important ones are :

- **Headers** : Meta data sent by your server back to client like server name, content size, last updated time etc.
- **Response status code** (`200`, `404`, `403`, `502`)
- **Response body** : Actual data to be sent to client : HTML, JS, JSON, CSS, Image etc.

#### More info

- HTTP requests and responses can be tracked from **Dev Tools** > **Network Tab**
- In Node, we can use core **http** module to create a Server which listens to requests, modify data in-between and provides responses. Server needs a **PORT** to be bound to - use only port number > 1024.
- Server can simply be said as **a function which receives a request and returns a response**. [ This is just for understanding]
- There are many **Headers** which exists on request and responses - shared a link below with list of existing headers.

- We can use Server to do 3 things:

  - **Static file Hosting** : Sending normal files without formatting or modifying.
  - **Server Side Rendering** : Mixing data with templates and rendering dynamic views (dynamic web pages)
  - **Web APIs** : Sending data via some APIs/ endpoints.

- Every Request has one and only one response. If there is more than 1 response which you want to send - you will encounter a error - "_Headers already sent_"
- POSTMAN is a software for doing complex API requests.

### [[Assignments]]

- **Assignment 1** : Capture the request which goes when you like a post on facebook (using Chrome network). What are the headers ? What is the payload ?
- **Assignment 2** : In the chapter we developed a server with only URL switch, but you have to make that more efficient by making it check both METHOD (GET,POST) + URL path
  - So output of a request with **GET /demo** will be different from **POST /demo** [ Use POSTMAN for requests]
- **Assignment 3 [Challenge]** : Try and run 2 different server using the same code you have `index.js`. You will need to use 2 different ports. But can you do it using the same file and changing PORTS dynamically somehow ?
- **Assignment 4 [Challenge]** : You can also send some data to server using /demo?product=123. where product=123 is called **query parameters**. Can you capture that data and make the product page work according to the ID (123) . [ This we will do in next chapters using express, but you can give it a try ]

### Related Links/Videos

1. [Web Server Concepts in 1 Video](https://youtu.be/sfMNI0yLZII)
2. [List of HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
3. [List of HTTP methods](https://www.restapitutorial.com/lessons/httpmethods.html)
4. [dummy JSON site](https://dummyjson.com/)

## Chapter 3 - Express JS

### [[Chapter-3-Notes]]

- **ExpressJS** is _de-facto_ Node framework - and used in most Node applications which are used as web server.
- You can install express `npm install express`
- Express has few level of methods :

  - Application methods : e.g. app.use()
  - Request methods
  - Response methods
  - Middleware methods
  - Router methods

- **Response** methods (**res** is our response objects)
  - **res.send()** - for sending HTML
  - **res.sendFile(**) - for sending File
  - **res.json** - for sending JSON
  - **res.sendStatus(404)** - for sending HTTP status only
- **HTTP Request** Types we generally use :
  - GET
  - POST
  - PUT
  - DELETE
  - PATCH
- API / Endpoints / Routes are used inter-changeably but they are related to server paths.

- **Middle-ware** : Modifies the request before it reaches the next middleware or endpoints.
- Sequence of middleware is very important, as first middleware is first traversed by request.
- Middle-wares can be used for many use cases, like loggers, authentication, parsing data etc.
- Middle-ware can be :

  - Application level : server.use(**middleware**)
  - Router level : server.get('/', **middleware**, (req,res)=>{})
  - Built-in middleware : **express.json()** [ for parsing body data], **express.static()**[for static hosting]
  - External Middle-wares - like **morgan**

- **Request** properties (**req** is our request object)

  - **req.ip** - IP address of client
  - **req.method** - HTTP method of request
  - **req.hostname** - like google.com / localhost
  - **req.query** - for capturing query parameters from URL e.g. localhost:8080 ? **query=value**
  - **req.body** -for capturing request body data (but its needs a middleware for body data decoding)
  - **req.params** - for capturing URL parameters for route path like `/products/:id`

- **Static Hosting** : we can make 1 or more folders as static hosted using **express.static** middleware.
  `server.use(express.static(< directory >))`
  Static hosting is like sharing a folder/directory and making its file readable as it is.
  Note : `index.html` is default file which would be read in a static hosted folder, if you don't mention any file name.

3 major ways of sending data from client to server via request are :

**1. Send data via URL in Query String**

This is easiest method to send data and mostly used in GET request.

When you have URL with `?name=Youstart&subject=express` at end, it translates in a query string. In query string each key,value pair is separated by `=` and between 2 such pairs we put `&`.

To read such data in express you can use `req.query` :

```javascript
server.get("/demo", function (req, res) {
  console.log(req.query); // prints all data in request object
  res.send(req.query); // send back same data in response object
});
```

- **Assignment 1** :

Make above server with API endpoint `/demo` as shown above :

1.  Try to call this API in your browser `http://localhost:8080/demo?name=Youstart` - this will return a response of `req.query` JSON object
2.  Create 3 query parameters `name`, `age`, `subject` with some values. Check the final output of `req.query` - can you find all data on server side. Can you send it back to client via `res` object.

**2. Send data via Request Params**

In this method you can have a URL with url path like `/Youstart/express` at end it translates in a param string. In param part string each value is separated by `/`. As you can see that URL only contains `value` not the `key` part of data. `key` part is decided by the endpoint definition at express server

server.get("/demo/:name/:subject",function(req,res){
console.log(req.params) // prints all data in request object
res.send(req.query); // send back same data in response object
})

So sequence of values matter in this case. As values sent from client are matched with `name` and `subject` params of URL later.

- **Assignment 2** :

Make above server with API endpoint `/demo` as shown above :

1.  Try to call this API in your browser `http://localhost:8080/demo/Youstart/Express` - this will return a response of `req.params` JSON object
2.  Create 3 URL params `name`, `age`, `subject` . Call the URL and check the final output of `req.params` - can you find all data on server side. Can you send it back to client via `res` object.

**3. Send data via Request Body**

Final method of sending data is via body part of request. We can send data directly to body using URL. We have to either use one of these methods

1.  Use a HTML Form and make `method` value as `POST`. This will make all name=value pair to go via body of request.
2.  Use special browsers like POSTMAN to change the body directly. (We will see this example in next classes)

```js
server.post("/demo", function (req, res) {
  console.log(req.body); // prints all data in request object
  res.send(req.body); // send back same data in response object
});
```

### Related Links/Videos

1. [Middleware Explanation video](https://www.youtube.com/watch?v=qkMJL0FwiyE)
2. [List of useful 3rd party middleware for Express](https://expressjs.com/en/resources/middleware.html)
3. [List of HTTP response status](https://www.restapitutorial.com/httpstatuscodes.html)

## Chapter 4 - REST API using Express JS

### [[Chapter-4-Notes]]

#### HTTP Methods

The HTTP method is the type of request you send to the server. You can choose from these five types below:

- `GET` : This request is used to get a resource from a server. If you perform a `GET` request, the server looks for the data you requested and sends it back to you. In other words, a `GET` request performs a `READ` operation. This is the default request method.
- `POST` This request is used to create a new resource on a server. If you perform a `POST` request, the server creates a new entry in the database and tells you whether the creation is successful. In other words, a `POST` request performs an `CREATE` operation.
- `PUT` and `PATCH`: These two requests are used to update a resource on a server. If you perform a `PUT` or `PATCH` request, the server updates an entry in the database and tells you whether the update is successful. In other words, a `PUT` or `PATCH` request performs an `UPDATE` operation.
- `DELETE` : This request is used to delete a resource from a server. If you perform a `DELETE` request, the server deletes an entry in the database and tells you whether the deletion is successful. In other words, a `DELETE` request performs a `DELETE` operation.

**REST API** are a combination of METHODS( GET, POST etc) , PATH (based on resource name)

Suppose you have a resource named `task`, Here is the example of 5 REST APIs commonly available for task.

1.  **READ APIs :**

- GET `\tasks` : to read all
- GET `\task\:id` : to read a particular task which can be identified by unique `id`

2.  **CREATE APIs :**

- POST `\tasks` : to create a new task object (data will go inside request body)

3.  **UPDATE APIs :**

- PUT `\task\:id` : to update a particular task which can be identified by unique `id`. Data to be updated will be sent in the request body. Document data will be generally **totally replaced.**
- PATCH `\task\:id` : to update a particular task which can be identified by unique `id`. Data to be updated will be sent in the request body. Only few fields will be replace which are sent in **request body**

4.  **DELETE APIs** :

- DELETE `\task\:id` : to delete a particular task which can be identified by unique `id`.

- **REST API** is a standard for making APIs.
  - We have to consider a resource which we want to access - like **Product**
  - We access **Product** using combination of HTTP method and URL style

**REST API ( CRUD - Create , Read , Update, Delete) :**

- **CREATE**
  - **POST** /products - create a new resource (product)
- **READ**

  - **GET** /products - read many resources (products)
  - **GET** /products/:id - read one specific resource (product)

- **UPDATE**

  - **PUT** /products/:id - update by replacing all content of specific resource (product).
  - **PATCH** /products/:id - update by only setting content from body of request and not replacing other parts of specific resource (product).

- **DELETE**
  - **DELETE** /products/:id - delete a specific resource (product).

### [[Assignments]]

- **Assignment 1** : Make an API similar to explained above for `Quotes` take dummy data from same site ([dummy json quotes](https://dummyjson.com/quotes))

### Related Links/Videos

1. [Middleware Explanation video](https://www.youtube.com/watch?v=qkMJL0FwiyE)

## Chapter 5 - Backend Directory Structure / MVC / Router

### [[Chapter-5-Notes]]

MVC (Model-View-Controller) is **a pattern in software design commonly used to implement user interfaces (VIEW), data (MODEL), and controlling logic (CONTROLLER)**. It emphasizes a separation between the software's business logic and display.

In Our Project this will be :
**Model** - Database Schema's and Business logics and rules
**View** - Server Side Templates (or React front-end)
**Controller** - functions attached to routes for modifying request and sending responses. It's a link between the Model and View.

**Router**

- These are like mini-application on which you can make set of Routes independently.
- Routers can be attached to main Server App using `server.use(router)`

Arrange Directory in Server like this :

**Controllers** - file containing functions which are attached to each route path
**Routes** - files containing routers
**Models** : to be discussed in later chapters
**Views**: to be discussed in later chapters

### [[Assignments]]

- **Assignment 1** : Read More about Model View Controller online, link given below.

### Related Links/Videos

1. [Model View Controller](https://www.freecodecamp.org/news/the-model-view-controller-pattern-mvc-architecture-and-frameworks-explained/)

## Chapter 6 - MongoDB - Server / Mongo Shell (CLI) / Mongo Atlas

### [[Chapter-6-Notes]]

MongoDB is **NoSQL** database which has a JSON like (BSON data) data storage.

## Setting up Database Server and Connecting with Mongo Shell

After installing MongoDB community server package on your system - you will have to start the database server using command :

### HOMEBREW Commands

```
brew services start mongodb-community@8.0

brew services start mongodb/brew/mongodb-community

brew services stop mongodb-community@8.0

brew services stop mongodb/brew/mongodb-community

brew services list
```

```bash
mongosh
```

This will start MongoDB server on default port 27017. You might have to create a directory for storage in MongoDB - if server asks for storage directory

Now you can use several commands to work with database:

```
show dbs
```

This will list all the database in your system

```
use <dbname>
```

This will command will let you switch to a particular <dbname>

## Understanding MongoDB structure

1. Hostname
2. Database
3. Collection
4. Document

Hostname is Database server address - like `localhost` or `db.xy.com`. In mongoDB hostname generally uses mongodb protocol to connect.
So URLs are generally are of shape : `mongodb://localhost:27017`

Database are topmost storage level of your data - mostly each application has 1 database - however complex application might have more than 1 databases. Database is something like `university database`

There can be many collections inside a database - collection is a group of documents of similar kind - `students`, `teachers`, `courses` etc

Finally document is basic entity of storage in Mongod, it looks very similar to an object in JSON. (However it is BSON)

## MONGO CLI

Mongo DB community server comes with in-bulit Mongo CLI which can act as a terminal based client. You can use the CRUD functionality from here

Read the commands [here](https://docs.mongodb.com/manual/reference/mongo-shell/)

## MONGO CLI Commands

```
//MongoDB insert commands
db.users.insertOne({ data })

db.users.insertMany([ data ])

```

```
//MongoDB find commands
db.users.find()

db.users.findOne({  name: 'Ava White' })

db.books.find({price: {$gt:15}}) #gt — greater than

db.books.find({price: {$eq:15.99}})

db.books.find({$and:[{stock: {$gt:4.5}}, {id:{$gt:9}}]})

db.books.find().sort({'rating': 1})

db.books.find().sort({'price': -1}).limit (2)

db.books.countDocuments({'price':{$lt:10}})

db.books.find({'price':{$lt:10}},{'name':1})

db.books.find({'price':{$lt:10}},{'name':1, 'price':1})

db.books.find({'price':{$lt:10}},{'name':1, 'price':1, '_id':0})

db.books.find({},{ 'price': 1, '_id':0})

db.books.find({},{ 'price': 1, '_id':0}).sort({'price':1})
```

```
//MongoDB update Commands
db.books.updateOne({'price':6.99},{$set:{'price':7.00}})

db.books.updateOne({'id':11},{$set:{'price':7.82}}, {'upsert':true}) // This will create a new data instead of update

db.books.updateOne({'id':11},{$set:{'price':12.34}})

db.books.replaceOne({'id':12},{'price':7.82})

```

```
//MongoDb Delete commands
db.books.deleteOne({'id':12})

db.books.deleteOne({'_id': ObjectId('677306406051078d85722d97')})
```

#### Assignment 1

- Try these commands given in Mongo CLI reference docs.

1. Show database
2. Use database
3. Show collection
4. Create Query (insertOne, insertMany)
5. Read Query (find, findOne)
6. Update Query (updateOne)
7. Delete Query (deleteOne, deleteMany)
8. Delete database (drop)

#### Assignment 2

#### Mongodump and Mongorestore

These utilities comes with community server and can be found in CMD/terminal. They are not the part of Mongo CLI client.

1. Mongodump command is used to take backup of complete database or some collections

```bash
mongodump  --db accounts
```

Above command takes backup of database `accounts` and stores into a directory named `dump`

2. Mongorestore command is used to restore database

```bash

mongorestore --db accounts dump/accounts

```

Above command restore your database `accounts` from backup directory `dump`

**Task** : Use these commands on terminal/CMD (not inside mongo client)

1. Take a backup of database you created in assignment 1.

2. Restore the backup of database from `dump` directory.

#### Using MONGODB NODE.JS DRIVER [ OPTIONAL READING - as we will not use Mongo Driver ]

To install MONGODB NODE.JS DRIVER use this command

```javascript
npm install mongodb
```

You can setup database in Node server using following commands :

```javascript
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "myproject";

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, client) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  const db = client.db(dbName);
});
```

Now this `db` handle can be used to perform any CRUD operation using MongoDB NodeJS driver.

#### CRUD Functions links

1. Create - [Shell Version](https://docs.mongodb.com/manual/crud/#create-operations) / [Node Version](http://mongodb.github.io/node-mongodb-native/3.0/tutorials/crud#insert-documents)
2. Read - [Shell Version](https://docs.mongodb.com/manual/crud/#read-operations) / [Node Version](http://mongodb.github.io/node-mongodb-native/3.0/tutorials/crud#findoneandupdate-findoneanddelete-and-findoneandreplace)
3. Update - [Shell Version](https://docs.mongodb.com/manual/crud/#update-operations) / [Node Version](http://mongodb.github.io/node-mongodb-native/3.0/tutorials/crud#updating-documents)
4. Delete - [Shell Version](https://docs.mongodb.com/manual/crud/#delete-operations) / [Node Version](http://mongodb.github.io/node-mongodb-native/3.0/tutorials/crud#removing-documents)

**Mongo Server**

- You can install **MongoDB community server** for your system and set the **Path** to `bin` folder
- You can choose your own database path while starting the **mongod** server

```
 mongod --dbpath <path-to-db-directory>
```

**Mongo Compass** : UI Client to see mongo server (local or remote)

**Mongo Shell** : Command-line based mongo client for checking mongo database.

Some Mongo Commands:

### Top Level commands :

(run from anywhere inside the shell)

- show dbs;
- use < database-name > - to choose a database and go inside its prompt

### Database CRUD commands :

(run only from inside a database)

#### CREATE COMMANDS

- db.< collectionName >.insertOne( _newDocument_ )
- db.< collectionName >.insertMany( _documentArray_ )

#### READ COMMANDS

- db.< collectionName >.**find**( _filterObject_ ) - to read all docs
- db.< collectionName >.**findOne**( _filterObject_ ) - to read one document
- db.< collectionName >.**countDocuments**( _filterObject_ ) - shows total number of documents.

**filter** Object : _{ fieldName : {operator: value}}_
fieldName : database fields name
**operator** : $eq = equal , $gt= greater than, $lt : less than, $gte = greater than equal, $and and $or operator
**value** : what value we are comparing with operator.

e.g { age : {$gt:5}}. - **age** is **greater than** value **5**

**Cursor functions :**
These are applied to find() query .

- **sort**( {fieldName: 1}) : 1 for ascending -1 for descending
- **limit**( x ) : only gives x documents

#### UPDATE COMMANDS

- db.< collectionName >.**updateOne**( _filterObject_, _updateObject_, options )
  - update Objects = _{ $set : {field: value}}_
  - options : _{upsert: true}_

**Upsert** : Update + Insert, when we want a new info to create a new obejcts if no existing object matches filter queries.

- db.< collectionName >.**replaceOne**( _filterObject_, _updateObject_ )
  Overwrites other fields also which are not in updateObject.

#### DELETE COMMANDS

- db.< collectionName >.**deleteOne**( _filterObject_ )

**Projection**

- Only return selected fields while returning result documents.
- db.< collectionName >.find( _filterObject_, projectionObject )
  e.g. {name:1, age:1, id:0} - only show **name** and **age** and don't show **id**

**MONGO ATLAS CLOUD SETUP** : Check the video in tutorial

** Enviroment Variable** : To use environment variable we can use a npm package called **dotenv** which will create new **process.env** variables.

- Install `dotenv` using `npm install dotenv`
- just have use `.env` file in your root directory
- and call `require('dotenv').config()`

### Related Links/Videos

[Mongo Atlas Setup Detailed Video](https://youtu.be/4vtFY_ijpKs)

## Chapter 7 - Mongoose and REST APIs

### [[Chapter-7-Notes]]

You can install mongoose using npm :

```bash
npm install mongoose
```

After installing , you can import mongoose to your project :

```js
const mongoose = require("mongoose");
```

#### Connection to Database

To connect mongoose to your database `test`, you have to use the following commands :

```js
var mongoose = require("mongoose");
await mongoose.connect("mongodb://127.0.0.1:27017/test");
```

Connection can also be stored in a variable to check whether it is connected properly or not. Also to disconnect database later on. You can read more details [Here](https://mongoosejs.com/docs/connections.html)

#### Schema

Schema is the specification according to which data object is created in Database.

`taskSchema` which contains `title`, `status`, `date` fields. So every task object saved in database will have these 3 fields according to Schema given

```js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: String,
  status: Boolean,
  date: { type: Date, default: Date.now },
});
```

Many types of data are allowed in Mongoose Schema. The common SchemaTypes are:

- String
- Number
- Date
- Boolean
- Mixed
- ObjectId
- Array

You can put a lot of conditions inside the Schema object :

```js

    age: { type: Number, default:18, min: 18, max: 65, required :true }
    // default value of Number is 18 and should be between 18-65, and can't be null or empty

```

Detailed information on SchemaTypes is [Here](https://mongoosejs.com/docs/schematypes.html)

#### Model

Model are similar to classes, they create a Class from Schema. These classes(i.e Models) can be used to create each new database object.

```js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  title: String,
  status: Boolean,
  date: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", taskSchema); //Task Model to create new database objects for `tasks` Collection
```

#### Task 1

Connect mongoose to a database named `todolist` if you don't have a database with this name. Mongoose will create it after you perform any insert operation.

Creata a Schema named `taskSchema` and model named `Task` as shown above.

### CRUD in Mongoose

### Create - new objects

To Create new obejct in database we can use `new` keyword and create an object from Model. We can use `save()` function to save the object in database. Unless, you call save function - the object remains in memory. If your collection not yet created in MongoDB, it will created with name of Model pluralized (e.g Task will make a collection named `tasks`)

```js
server.post("/task", function (req, res) {
  let task = new Task();

  task.title = "shopping";
  task.status = true;
  task.date = new Date();

  task.save();
});
```

#### Task 2

You have to create an API Endpoint to type `POST` named `/task`. It will create a new task item in database whenever called properly. All 3 fields `title`, `status`, `date` must be mandatory (`required`). If someone is not passing all fields properly, no database entry should be created.

```js
//request body :

{
    "title" : "task1",
    "status" : true,
    "date" :'2010-05-30"

}

// response body should return the newly created object.

res.json(task);

```

Check using Mongo Compass/or Mongo Shell that new record in database is created. Also check name of collection. Is is `tasks` ?

### Read objects

To read new obejcts from database, one can use `find` query or similar queries. `find` queries also contain some conditions which can restrict what kind of data objects you want to read from database.

```js
server.get("/task/:name", function (req, res) {
  Task.findOne({ name: req.params.name }, function (err, doc) {
    console.log(doc); // this will contain db object
  });
});

server.get("/tasks", function (req, res) {
  Task.find({}, function (err, docs) {
    console.log(docs); // this is an array which contains all task objects
  });
});
```

#### Task 3

You have to create an API Endpoint to type `GET` named `/tasks`. It will return all task available in collection `tasks`.

```js
//request is GET so no data in body :

// response body should return the all db objects of collection tasks.

res.json(tasks);
```

Check Mongo Compass/or Mongo Shell - if all records are returned in response. How you will change this API to make it return only one database record in which `title` is matched with `title` sent in request `query`.

### Update - existing objects

To Update an existing object in database we need to first find an object from database and then update in database. This might be considered as a combination of `find` and `save` methods.

There are generally 2 cases in update :

1. Updating all values and overwriting the object properties completely.
2. Updating only few values by setting their new values.

First scenario is covered using this query. Here you are overwriting all properties and resulting object will only have `name` property.

```js
server.put("/task/:name", function (req, res) {
  Task.findOneAndReplace({ name: req.params.name }, { name: "YouStart" }, { new: true }, function (err, doc) {
    console.log(doc); // this will contain new db object
  });
});
```

Second scenario is covered using this query. Here you are only changing value of `name` property in existing object without changing other values in Object.

```js

server.put("/task/:name",function(req,res){
    Task.findOneAndUpdate({name:req.params.name},{name:'YouStart'},,{new:true},function(err,doc){
        console.log(doc)  // this will contain db object
    })
})

```

#### Task 4

You have to create an API Endpoint to type `PUT` named `/task/:id`. It will update existing task item in database which has ObjectId set to `id` you have passed.

```js
//request params will have id in URL path :

{
    "title" : "task-changed",
}

// response body should return the newly updated object.

res.json(task);

```

Check using Mongo Compass/or Mongo Shell that only `title` of record in database is changed. All other properties remain the same.

### Delete - existing objects

To Delete existing object from database we need to first find an object from database and then delete. This might be considered as a combination of `find` and `delete` methods.

```js
server.delete("/task/:name", function (req, res) {
  Task.findOneAndDelete({ name: req.params.name }, function (err, doc) {
    console.log(doc); // this will contain deleted object object
  });
});
```

#### Task 5

You have to create an API Endpoint to type `DELETE` named `/task/:id`. It will delete existing task item in database which has ObjectId set to `id` you have passed.

```js
//request params will have id in URL path :

// response body should return the deleted object.

res.json(task);
```

Check using Mongo Compass/or Mongo Shell that the record is deleted or not.

### [[Chapter Notes]]

- install mongoose
  `npm install mongoose`
- Mongoose connection code

```javascript
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
```

- Mongoose **Schema** : Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.

```javascript
//schemas for Books
const bookSchema = new Schema({
  title: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, min: [0, "Invalid price input"], required: true },
  stock: { type: Number, required: true },
  rating: { type: Number, min: [0, "Invalid rating input"], max: [5, "Invalid rating input"] },
  genres: [String],
});
```

- Mongoose **Model** : model are built using a combination of Schema and name of Collection.

```javascript
//Model for Books
exports.Book = mongoose.model("Book", bookSchema);
```

- Mongoose **Document** - its is instance of a model. so Model is like a class and documents are like its objects. These documents are directly saved in mongoDB.

Mongoose Schema/Model can act as **Model** of **Model**-View-Controller concept.

### CRUD API and mongoose methods

**CREATE** :

1. **create book** - use **POST ** HTTP Method

```javascript
const book = new Book(req.body);
const doc = await book.save();
console.log([{ err: null, doc }]);
```

**READ** :

1. **read all books** - use **GET** HTTP Method

```javascript
const book = await Book.find();
const book = await Book.find({ price: { $gt: 500 } });
```

2. **read 1 book** - use **GET** HTTP Method

```javascript
const book = await Book.findById(id);
```

**UPDATE** :

1. replace book fields (all fields) - use **PUT** HTTP Method

```javascript
const replacedBook = await Book.findOneAndReplace({ _id: id }, replaceBookData, {
  new: true, // Return the updated document
  runValidators: true, // Validate the data before updating
});
```

2. update only some book fields - use **PATCH** HTTP Method

```javascript
const updatedBook = await Book.findOneAndUpdate({ _id: id }, updateBookData, {
  new: true, // Return the updated document
  runValidators: true, // Validate the data before updating
});
```

**DELETE** :

1. delete 1 product - use **DELETE** HTTP Method

```javascript
// Use findOneAndDelete to delete the book by its _id
const deletedBook = await Book.findOneAndDelete({ _id: id });
```

### [[Assignments]]

- **Assignment 1** : Make a Schema for `user` with `userSchema` which has these conditions :

  - `firstName` is required, maximum length 16 chars
  - `lastName` is not required, maximum length 16 chars
  - `age` is a Number, minimum value 12, maximum 100
  - `email` make a validator of email, as given in mongoose documentation.
  - `address` make address a nested data structure which has its own Schema [ **AddressSchema** ??] [ Hint: check mongoose documentation for sub-documents to do it

  Create `addressSchema` needed in above example as :

  - `pincode` : Number, required
  - `street` : String, required
  - `phone`: String, length=10

Now try to create this **user** object and **save** it to database.

- What happens to **addresses** ? How address **document** is stored ? check if it creates a **new collection** in database
- What happens if you don't provide validated data in any field. [Note: Throw proper errors strings ]

### Related Links/Videos

Queries in Mongoose : [Link](https://mongoosejs.com/docs/queries.html)

## Chapter 8 - Deploy Live

### [[Chapter-8-Notes]]

**Preparation for deployment**

- First check whether front-end routes are independent of server, and make all of them relative to `/`
- Connect MongoDB atlas - in-place of mongo local database

### How to Deploy to Vercel :

- Commit you code on a github account (personal account for free services)
- Set Environment Variables on Vercel - like MONGO_URL, PUBLIC_DIR
- Put a vercel config file - `vercel.json` in your project root directory.
- After every change, commit your changes - and push code on github.
- You have to provide permission for github directory to vercel. It will pickup `vercel.json` and `package.json` and deploy your code accordingly.
- Check video for more details.

### [[Assignments]]

- **Assignment 1** : Deploy your own application or API only to a live server like `Vercel`
- **Assignment 2 [Challenge]** : Deploy your own application or API only to a live server `Railway.app`

### Related Links/Videos

1. [Heroku Deployment Video](https://www.youtube.com/watch?v=GeXA_MzMR6I)
2. [Git Crash Course](https://youtu.be/kviiFelh28g)

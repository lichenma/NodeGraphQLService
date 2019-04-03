# Setting up a Powerful API with NodeJS, GraphQL, MongoDB, Hapi, and Swagger 

Separating the frontend and backend of any application has many advantages: 

* The main reason why reusable APIs are popular, **Support for any client** - APIs allow the user to
  consume data from a web client, mobile app, desktop app, etc (any client really) 

* **Separation of concerns**. Gone are the days where we have one monolithic app where everything is 
  bundled together. Imagine we have an extremely convoluted application. The only option then is to
  hire extremely experienced/senior developers due to the natural complexity

If we are to hire juniors (that's me!) and have room for training staff then we need to have our 
concerns separated so each party can focus on their **microservices**. 

<br>

> With separation of concerns, developers can reduce the complexity of the application by splitting 
> responsibilities into `microservices` where each team is specialized in their micro-service

<br> 

The **on-boarding/ramp-up process is much quicker** thanks to splitting up responsibilities (backend
team, frontend team, dev ops team, and so on) 


## Introduction 

We will be building a powerful, yet flexible, GraphQL API based on NodeJS with Swagger documentation
powered by MongoDB. 



The main backbone of this API will be Hapi.js. We will go over all the technology in substantial 
detail. 


At the end we will have a well documented GraphQL API as well as some awesome client integration 
(React, Vue, Angular) 


## Creating the Project 

Inside our project directory we will initialize a Node project with the `hapi` and `nodemon` 
dependencies. To initialize a node project run the following command in the project directory: 

```
npm init
```

Then to add the `hapi` and `nodemon` dependencies run the following command: 


```
npm add hapi nodemon
```




<br><br> 

### Hapi.JS

Before moving on, let's go over what hapi.js is and what it can do for us. 

<br>

> hapi enables developers to focus on writing reusable application logic instead of spending time 
> building infrastructure 

<br> 

Instead of going with the classic `Express` we are going to use Hapi. In a nutshell, Hapi is a Node 
framework with simplicity and flexibility over **Boilerplate Code** - boilerplate code refers to
sections of code that have  to be included in many places with little or no alteration. It is often 
used when referring to languages that are considered verbose (programmer must write a lot of code to
do minimal jobs). Hapi will enable us to build the API in a very rapid manner. 



<br><br> 

### Nodemon 

The second dependency we installed was the good old nodemon. Nodemon restarts our server automatically
whenever we make changes. It speeds up our development by a big factor. 


In terms of text editor for this project, I will be using Visual Studio Code. 


Setting up a Hapi server is very straightforward. Create an `index.js` file at the root directory with
the contents of the following: 


```javascript 
const hapi = require('hapi')

const server = hapi.server({
	port: 4000, 
	host: 'localhost'
});

const init = async () => {
	await server.start();
	console.log(`Server running at: ${server.info.uri}`);
};

init();
```

1. We require the `hapi` dependency
2. Create a constant called server which creates a new instance of our Hapi server - as the arugments 
   we pass an object with the port and the host options
3. Finally, we create an **asynchronous** expression called init. Inside the init method, we have 
   another asynchronous method which starts the server called `server.start()`. At the bottom we call
   the `init()` function 

If you are unsure about async/await , we have covered asynchronous javascript in our TicTacToe 
Application. 


### Running the Project 


We can now run the project using the following command: 

```
node index.js
```



And we should see the following when we visit `localhost:4000` 

```
{"statusCode":404,"error":"Not Found","message":"Not Found"}
```


This is perfectly fine because the Hapi server expects a route and a handler. More on that in a bit. 
First let's add the script to run our server with nodemon. Open `package.json` and edit the scripts 
section. 


```
{
  "name": "01-graphqlapi",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "dependencies": {
    "hapi": "^18.1.0",
    "nodemon": "^1.18.10"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon index.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/lichenma/NodeGraphQLService.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/lichenma/NodeGraphQLService/issues"
  },
  "homepage": "https://github.com/lichenma/NodeGraphQLService#readme"
}
```


## Routing 


Routing is very intuitive with Hapi. Let's say we hit `/` , there are three main components in play 
here: 

* What is the path - `path`
* What is the HTTP method? Is it a `GET` - `POST` or something else? - `method`
* What will happen if the route is reached? - `handler`


Here is the code that we will add inside `index.js`: 


```javascript 
const init = async () => {
	
	server.route({
		
		method: 'GET',
		path: '/', 
		handler: function(request, reply) {
			return `<h1>Hello World</h1>`; 
		}
	});

	await server.start(); 
	console.log(`Server running at: ${server.info.uri}`); 
};

init();
```


Inside the init method we attached a new method to our server called `route` with options passed as our
argument. If we refresh our page we should see the return value of our root `handler`. This is great
but there is so much more that we can do. 




## Setting up our Database 

Right now we are going to setup our database, we are going to use `mongodb` with `mongoose`. Writing 
MongoDB validation, casting and and business logic boilerplate is incredibly tedious so that is where 
`Mongoose` comes in to help out. 


To add in mongoose we need to run this command: 

```
npm add mongoose
```

and add in mongoose into our `index.js`: 

```javascript
const hapi = require('hapi'); 
const mongoose = require('mongoose'); 
```


The next ingredient related to our database is **mlab**, we used this provider in the `Worldly Goods` 
web application as well. Instead of running mongo on our local computer, we are gonna use a cloud 
provider like mlab. 


Mlab is pretty good and simple to use, and best of all, it is free to use. There are more awesome 
alternatives out there and we can try them out in another project. 


Now log into mLab and create a new database - add a new database user as well. 




## Connecting Mongoose with Mlab 

Open `index.js` and add the following lines and credentials. We are basically just telling mongoose
which database we want to connect to. 


```javascript
mongoose.connect('mongodb://<user>:<password>@<yourdatabase>.mlab.com:<port>/<database-name>');

mongoose.connect('mongodb://example:password@ds123456.mlab.com:808080/graphql-api');

mongoose.connection.once('open', () => {
	console.log('connected to database');
});
```

If everything went according to plan, we should now see `connected to database` in the console when 
we run the application: 


```

$ npm run start

> 01-graphqlapi@1.0.0 start C:\02-Projects\10-NodeJS\01-GraphQLAPI
> nodemon index.js

[nodemon] 1.18.10
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node index.js`
(node:19876) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
Server running at: http://localhost:4000
Connected to Database

```

This should complete most of the setup stages and now we can dive into the cool parts!


## Creating Models 

With mongoDB, we follow the convention of models - in other words, data modeling. 

Data in MongoDB has a *flexible schema*. Unlike SQL databases where you must determine and declare a
table's schema before inserting data, MongoDB's collections do not enforce document structure. This 
flexibility facilitates the mapping of documents to an entity or an object. Each document can match the
data fields of the represented entity, even if the data has substantial variation. In practice, 
however, the documents in a collection share a similar structure. 


Basically we just declare our schema for collections. Think of collections as tables in an SQL database
. For this test application we are going to create a directory called models. Inside we will create a
file `Painting.js` which is our painting mdoel. It will hold all data related to paintings. Here is how
it will look: 




```javascript 
const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

/* 
	Notice how there is no id provide to the schema - Mongoose will auto-assign an ID by default 
	to all schemas 

*/ 


const PaintingSchema = new Schema({
	name: String, 
	url: String, 
	techniques: [String]
});

module.exports = mongoose.model('Painting', PaintingSchema); 
```


**Code Breakdown**

* We require the mongoose dependency 

* We declare our `PaintingSchema` by calling the mongoose schema constructor and passing in the 
  options. Notice how it is strongly typed: for example the `name` field can consist of a string and 
  `techniques` consists of an array of strings 

* We export the model and name it `Painting` 





## Fetching Paintings from the Database 

First we need to import the `Painting` model to `index.js`: 

```javascript
const Painting = require('./models/Painting');
```



## Adding New Routes

Ideally, we want to have to have URL endpoints reflectings our actions such as `/api/v1/paintings` - 
`/api/v1/paintings/{id}` - and so on. 


We are going to start with a `GET` and `POST` route. `GET` fetches all the paintings and `POST` adds a
new painting. 

```javascript 
const init = async () => {
	server.route([
		{
			method: 'GET', 
			path: '/', 
			handler: function(request, reply) {
				return `<h1>Hello World</h1>`;
			}
		},
		{
			method: 'GET',
			path: '/api/v1/paintings',
			handler: (request, reply) => {
				return Painting.find();
			}
		},
		{
			method: 'POST',
			path: '/api/v1/paintings',
			handler: (request, reply) => {
				const {name, url, techniques} = req.payload;
				const painting = new Painting({
					name, 
					url,
					techniques
				});

				return painting.save();
			}
		}

]};

```

Notice that we modified the route to be an array of objects instead of a single object. Also, we are
using arrow functions. 

<br> 

**Code Breakdown** 

* We created a `GET` method for `/api/v1/paintings` path. Inside the handler we are calling the 
  mongoose schema. Mongoose hs built-in methods and the handy method we are using in this case is 
  `find()` - this returns all paintings since we are not passing in any conditions to find by. 
  Therefore it returns all records. 

* We also crated a `POST` for the same path. The reason for that is we are following **REST** 
  conventions. Let's deconstruct the route handler - remember in our `Painting` schema we declared 
  three fields: `name`, `url` and `techniques`. Here we are just accepting those arguments from the
  request (we will be doing that will postman/curl) and passing the request arguments to our mongoose
  schema. After we are done passing arguments, we call the `save()` method on our new recor, which 
  saves it to the mlab database 


If we head over to `http://localhost:4000/api/v1/paintings` we should see an empty array - we have not
added any paintings yet. 




## Conclusion 

Credits go to the Lasn from **strilliant** - Thank you for providing an awesome tutorial that covers 
this topic. 












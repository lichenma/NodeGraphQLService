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

<br>
### Running the Project 


We can now run the project using the following command: 

```
npm run start  or  node index.js
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

<br><br>
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



<br><br>
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



<br><br>
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

<br><br>
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
	technique: String
});

module.exports = mongoose.model('Painting', PaintingSchema); 
```


**Code Breakdown**

* We require the mongoose dependency 

* We declare our `PaintingSchema` by calling the mongoose schema constructor and passing in the 
  options. Notice how it is strongly typed: for example the `name` field can consist of a string and 
  `techniques` consists of an array of strings 

* We export the model and name it `Painting` 




<br><br>
## Fetching Paintings from the Database 

First we need to import the `Painting` model to `index.js`: 

```javascript
const Painting = require('./models/Painting');
```


<br><br>
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
				const {name, url, technique} = req.payload;
				const painting = new Painting({
					name, 
					url,
					technique
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
  three fields: `name`, `url` and `technique`. Here we are just accepting those arguments from the
  request (we will be doing that will postman/curl) and passing the request arguments to our mongoose
  schema. After we are done passing arguments, we call the `save()` method on our new record, which 
  saves it to the mlab database 


If we head over to `http://localhost:4000/api/v1/paintings` we should see an empty array - we have not
added any paintings yet. 



Let's do that now using Postman - curl works as well and is very simple but I want to try and get used
to working with Postman. 





<br> 
### Create Paintings using Postman 


After opening up postman, 

* On the left we can see the method options. Change that to `POST` 
* Next to the `POST` method we have the URL which is where we want to send our method to. 
* On the right we can see the blue button which sends the request 
* Below the URL bar we have the options. Click on the body and fill in the fields with the request 
  body. For this example we will provide the following: 

```
{
	"name": "Mona Lisa",
	"url": "https://en.wikipedia.org/wiki/Mona_Lisa#/media/File:Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg",
	"technique": "Portrait"
}
```

If we post the painting and then go to `http://localhost:4000/api/v1/paintings`, we should see the 
following: 


```
[{"_id":"5cab5812f1a60a393c68eff1","name":"Mona Lisa","url":"http://testing.com","technique":"portrait","__v":0}]
```







<br><br>
## Overview of GraphQL 


What is graphQL anyways and why is it so popular right now? 

> GraphQL's power comes from a simple idea - **instead of defining the structure of responses on the
> server, the flexibility is given to the client.** Each request specifies what fields and 
> relationships the client wants to get back, and GraphQL will construct a response tailored for this
> particular request. The benefit: only one round-trip is needed to fetch all the complex data that 
> might otherwise span multiple REST endpoints, and at the same time only return data that are actually
> needed and nothing more


GraphQL solves many pain points that traditional REST APIs might face. Some of them are: 
* **Over-fetching** - there is data in the response that is unused
* **Under-fetching** - you do not have enough data to a call to an endpoint leading the user to call a 
  second endpoint 

GraphQL has gotten so popular in part because people have good reason to believe it will replace REST
entirely - just like REST replaced SOAP. 



<br><br>
## Getting Started with GraphQL

First we need to install the appropriate dependencies. 

```
npm add graphql apollo-server-hapi
```

Graphql is the main package for graphql and apollo-server-hapi is the glue between our Hapi server and 
GraphQL. 


<br> 

Let's create a new folder called `graphql` and inside a file called `PaintingType.js` 


```javascript
const graphql = require('graphql'); 

const { GraphQLObjectType, GraphQlString} = graphql;

const PaintingType = new GraphQlObjectType({
	
	name: 'Painting',

	fields: () => ({
		
		id: { type: GraphQLString }, 

		name: { type: GraphQLString },

		url: { type: GraphQLString },

		technique: { type: GraphQLString }

	})
});

module.exports = PaintingType;
```


**Code Breakdown**

Let's examine this from top to bottom: 

* First we `require` the GraphQL library
* At line 3 we are `deconstructing objects` from GraphQL

<br><br>
```
const { GraphQLObjectType, GraphQLString } = graphql 
```

this statement is the same as: 

```
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLObjectType = graphql.GraphQLString 
```
<br><br>


* Next up, we create a new GraphQLObjectType

<br><br> 

Almost all of the GraphQL types we will define will be object types. Object types have a name, but most
importantly describe their fields. 

Now as we can see, GraphQL is a statically typed language - which means that we have to declare all 
types for our fields. For now our field types are all the type GraphQLString 

This was our query for the paintings. Now we need to hook it up to our root query which the server will
serve and from where it will fetch all data. 

<br><br>



## GraphQL Schema Language 

There are many GraphQL server libraries available, in many different programming languages, and the 
way you construct your schema will depend on the library you are using. However, there is also a 
semi-official shorthand "schema language" which, although it doesn't support all GraphQL schema 
features, provides a language agnostic way to describe schemas. 


Typically you would not write your application's schema in the schema language (although the reference
JavaScript implementation does allow you to, and it can be useful for prototyping) - it is useful in 
our examples to use it. Translating it to your sever implementation's schema constructors should be 
reasonably mechanical. 


**Schema Basics**

A GraphQL schema is in essence the definition of a type system - how the data available to your client
is related and what queries can be made to retrieve it. Additionally it describes the mutations 
available (and the data they can return). 

A schema is constructed of a set of object types - which are maps of named fields, each of which is 
another type, either another object, or a scalar base type. You can think of the object types as the 
nodes in the type system's "graph" and the scalar types as leaves (technically nodes of degree one). 

A GraphQL schema is directly analogous to (and in many implementations actually is) a set of classes in
an object-oriented programming language. Each class (or "object type") has a set of properties and
methods (or "fields") that may be (or return) simple scalars or other class instances. Unsurprisingly,
the analogy extends, and other object-oriented concepts, such as type interfaces and union types apply.

When thinking about a schema, it is usefult to remember what a GraphQL query does: it starts at a 
given operation, and walks a (tree - like) path through the type system, choosing one or more fields 
from each object type that it encounters.





<br><br>

## Building the Root Query 


Let's create a file called `schema.js` inside our GraphQL folder. Here is what the file will look like:

```javascript 
const graphql = require('graphql');

const PaintingType = require('./PaintingType');

const {
	GraphQLObjectType, 
	GraphQLString, 
	GraphQLSchema
} = graphql; 

const RootQuery = new GraphQLObjectType ({
	
	name: 'RootQueryType',
	fields: {
		
		painting: {
			
			type: PaintingType, 
			args: { id: { type: GraphQLString } }, 

			resolve(parent, args) {
				
				// logic for serving data 
			}
		}
	}
});
```

This is the root query that we will serve to the server. Notice that the fields section is more 
convoluted now - we are passing the name of the field with the type `PaintingType` and `args` field. 

<br> 

> How would we find a specific painting? 

<br>

We need some kind of argument to sort by and in this case we are going to be using the `id`. 



Next we have the `resolve` function which has two parameters, 
* `parent`
* `args` 




<br><br> 


Just to illustrate, GraphQL queries look like the following: 
```javascript 
{ 
	painting(id: 20) {
	
		name

	}
}
```



The `painting` query is from `PaintingType.js` - notice how we pass an argument that is the `args` 
parameter in the `resolve()` - and the parent would be used in more complex queries where you would
have even more nesting going on. 



Let's export our root query and pass it to the Hapi server. Notice that type `GraphQLSchema` - this is
the root query/schema definition we pass to the server. 

```javascript 
module.exports = new GraphQLSchema({
	
	query: RootQuery

});
```

<br> 

Going back to our `index.js` - we `require` GraphQL packages and the `schema.js` 

```javascript
const { graphqlHapi, graphiqlHapi} = require('apollo-server-hapi');
const schema = require('./graphql/schema');
```

<br> 






## Registering Plugins 

<br> 


Next up we need to register the hapi-graphiql plugin: 

```javascript 
const init = async () => {
	
	await server.register({
		
		//inside the server.register({}) we pass our GraphQL configuration
		
		plugin: graphiqlHapi, 
		options: {
			path: '/graphiql',
			graphiqlOptions: {
				endpointURL: '/graphql'
			},
			route:{
				cors: true
			}
	});
}
```

Fairly simple right? We installed the `graphiql` plugin. Notice that it is graphiql and not graphql.

> Graphiql is the in-browser IDE for exploring GraphQL





## Conclusion 

Credits go to the Lasn from **strilliant** - Thank you for providing an awesome tutorial that covers 
this topic. 












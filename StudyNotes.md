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














## Conclusion 

Credits go to the Lasn from **strilliant** - Thank you for providing an awesome tutorial that covers 
this topic. 

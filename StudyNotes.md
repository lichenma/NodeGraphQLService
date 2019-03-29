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















## Conclusion 

Credits go to the Lasn from **strilliant** - Thank you for providing an awesome tutorial that covers 
this topic. 

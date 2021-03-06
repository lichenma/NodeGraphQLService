const hapi = require('hapi');
const mongoose = require('mongoose');
const Painting = require('./models/Painting');
const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');
const schema = require('./graphql/schema');


const server = hapi.server({
    port: 4000,
    host: 'localhost'
});

mongoose.connect('mongodb://example:password123@ds351455.mlab.com:51455/nodejs-graphql-api')

mongoose.connection.once('open', () => {
    console.log('Connected to Database');
});



const init = async () => {
  
  await server.register({
    plugin: graphiqlHapi,
    options: {
      path: '/graphiql',
      graphiqlOptions: {
        endpointURL: '/graphql'
      },
      route: {
        cors: true
      }
    }
  });
  
 
  await server.register({
    plugin: graphqlHapi,
    options: {
      path: '/graphql',
      graphqlOptions: {
        schema
      },
      route: {
        cors: true
      }
    }
  }); 
  
  server.route([
    {
      method: 'GET',
      path: '/',
      handler: function(request, reply){
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
          const {name, url, technique} = request.payload;
          const painting = new Painting({
              name, 
              url,
              technique
          });

          return painting.save();
      }
    }
  ]);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) =>{
  if (err) {
    console.log(err);
    process.exit(1);
  }
});

init();
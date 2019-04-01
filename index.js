const hapi = require('hapi');
const mongoose = require('mongoose');
const Painting = require('./models/Painting');

const server = hapi.server({
    port: 4000,
    host: 'localhost'
});

mongoose.connect('mongodb://example:password123@ds351455.mlab.com:51455/nodejs-graphql-api')

mongoose.connection.once('open', () => {
    console.log('Connected to Database');
});

const init = async() => {
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
            const {name, url, techniques} = req.payload;
            const painting = new Painting({
                name, 
                url, 
                techniques
            });

            return painting.save();
        }
      }
    ]);

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

init();
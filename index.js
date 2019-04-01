const hapi = require('hapi');
const mongoose = require('mongoose');

const server = hapi.server({
    port: 4000,
    host: 'localhost'
});

mongoose.connect('mongodb://example:password123@ds351455.mlab.com:51455/nodejs-graphql-api')

mongoose.connection.once('open', () => {
    console.log('Connected to Database');
});

const init = async() => {
    server.route({
        method: 'GET',
        path: '/',
        handler: function(request, reply){
            return `<h1>Hello World</h1>`;
        }
    });

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

init();
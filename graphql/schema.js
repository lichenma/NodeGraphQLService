const graphql = require('graphql');
const PaintingType = require('./PaintingType');
const PaintingType = require('./../models/Painting');

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
            resolve(parent, args){
                return PaintingType.findbyId(args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});
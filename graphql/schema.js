const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    
    type Product{
        _id: ID!
        title: String!
        description: String!
        imgUrl: String!
        price: Int!
        qty: Int!
        creator: User!
        createdAt: String!
        updatedAt: String!
    }

    type User{
        _id: ID!
        email: String!
        name: String!
        password: String!
        status: String!
        products:[Product!]!
    }

    input UserInputData{
        email: String!
        name: String!
        password: String!
    }

    input ProductInputData{
        title: String!
        description: String!
        imgUrl: String!
    }

    type AuthData{
        token: String!
        userId: String!
    }  

    type RootQuery{
        login(email: String!, password: String!):AuthData!
    }   

    type RootMutation{
        createUser(userInput: UserInputData) :User!
        createProduct(productInput: ProductInputData) :Product!
    }
 
    schema{
        query: RootQuery
        mutation: RootMutation
    }
`);
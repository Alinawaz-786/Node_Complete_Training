const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    
    type User{
        _id: ID!
        email: String!
        name: String!
        password: String!
        status: String!

    }

    type Product{
        _id: ID!
        title: String!
        description: String!
        imgUrl: String!
        price: Int!
        qty: Int!
        user_id: User!
        createdAt: String!
        updatedAt: String!
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
        price: Int!
        qty: Int!
    }

    type AuthData{
        token: String!
        userId: String!
    }  

    type ProductData{
        product: [Product!]!
        totalProduct: Int!
    }  

    type RootQuery{
        login(email: String!, password: String!):AuthData!
        product:ProductData!
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
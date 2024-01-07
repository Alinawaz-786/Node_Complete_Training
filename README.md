## SignUp query on Subgraph Explore

mutation{
  createUser(userInput:
    {email:"admin@admin.com",name:"Max12",password:"admin"})
  {
    _id
    email
  }
}

## Login query on Subgraph Explore

{
  login(email:"admin@admin.com",password:"admin")
  {
    token
    userId
  }
}


  
mutation{
  createProduct(productInput:{title:"Laptop",description:"This is testing description.",
    imgUrl:"images.png",price:12,qty:2}){
    _id
    title
  }
}
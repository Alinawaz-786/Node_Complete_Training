 const deleteProduct = (btn) =>{
     //Get the product Id.
    const prodID =  btn.parentNode.querySelector('[name=productId]').value;
     console.log(prodID);
     //Get the product name.
     const prodName =  btn.parentNode.querySelector('[name=productName]').value;
     console.log(prodName);

 };
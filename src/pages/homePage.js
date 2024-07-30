//import React from 'react'
import { useState } from "react"
import CartProducts from "../components/cart/cartProducts"

const dataproduct = [
  {
    id:1,
    productname:'iphone15',
    productdesc:'best sale',
    price:1220,
    image:'https://m.xcite.com/media/catalog/product//i/p/iphone_14_pro_-_silver_1_1_1.jpg'

  },
  {
    id:2,
    productname:'iphone14',
    productdesc:'best sale',
    price:1000
  },
  {
    id:3,
    productname:'iphone11',
    productdesc:'best sale',
    price:800
  }
]

function HomePage() {
  const [list, setList] = useState(dataproduct)
  
  return (
    <div>HomePage
      {list.map((item,index)=> 
      
      <CartProducts key={index} Image={item.image} ProductName={item.productname} Description={item.productdesc}Price={item.price}/>

      )}
    
    
    </div>
  )
}
export default HomePage

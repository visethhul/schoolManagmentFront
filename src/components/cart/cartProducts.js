import DefaultImage from '../../asset/images/DefalutImage.png'
import styles from "./styles.module.css"
const CartProducts= ({
  ProductName, 
  Description, 
  Price,
  Image  
})=>{
  return (
 <div className={styles.container}>
   <img 
   src={ Image || DefaultImage}
   alt="Product"
   width={100}
   hight={100}
   />
   <div calssName={styles.product}>Product Name:{ProductName}</div>
   <div>Product Desc:{Description} </div>
   <div>Price: {Price}</div>
   <button>Add To Cart</button>
 </div>
                                      
)  
}
export default CartProducts;
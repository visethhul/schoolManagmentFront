import { Outlet, Link } from "react-router-dom";
import styles from "./mainLayout.module.css"
const MainLayout = () =>{
  return(
  <div>
   <ul className={styles.menu}>
  <li className={styles.item}><Link to="/">Home</Link></li>
  <li className={styles.item}><Link to="/about">About</Link></li>
  <li className={styles.item}><Link to="/login">Login</Link></li>
  <li className={styles.item}><Link to="/register">Register</Link></li>
  

</ul>
    <div>
      <Outlet/>
    </div>
   </div>
  );
};
export default MainLayout;
import { Outlet, Link } from "react-router-dom";
import styles from './loginLayout.module.css'
import { getIsLogin, Logout } from "../../utils/userAuth";

const LoginLayout = () =>{
  const isLogin = getIsLogin()
  return(
    <div>
       <ul className={styles.menu}>
        <li className={styles.item}><Link to="/">Home</Link></li>
        <li className={styles.item}><Link to="/about">About</Link></li>
        <li className={styles.item}><Link to="/login">Login</Link></li>
        
        {isLogin && (
         <>
         <li className={styles.item}><Link to="/dashboard">Deshboard</Link></li>
         <li className={styles.item}><Link to ="#" onClick={Logout}>Logout</Link></li>
         </>
         )} 
       
       </ul>
       <div>
        <Outlet/>
       </div>
    </div>
  
  );
};
export default LoginLayout;
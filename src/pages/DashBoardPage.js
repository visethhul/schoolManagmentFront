import React from "react"
import styles from "./cssPage/dashboardPage.module.css"

function DashBoardPage() {
   return (
     <div className={styles['dashboard-container']}>
       <h3 className={styles['dashboard-title']}>Welcome DeshBoard Page </h3>
       <div className={styles['dashboard-content']}>
           <p>Your content goes here..</p>
       </div>
     </div>
   );
 }
 
 export default DashBoardPage
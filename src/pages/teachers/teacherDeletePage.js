import React from "react";
import { Modal, Button } from "antd";

// TeacherDeletePage component handles the delete confirmation modal 
const TeacherDeletePage = ({ open, onCancel, onConfirm, teacher}) =>{
   return (
     <Modal
       title="Delete Teacher"
       open={open}
       onCancel={onCancel}
       footer={[
         <Button key="cancel" onClick={onCancel}>
           Cancel
         </Button>,
         <Button
           key="confirm"
           type="primary"
           danger
           onClick={() => onConfirm(teacher)}>
           Delete
         </Button>,
       ]}
     >
       {teacher && (
         
         <div>
           <p>Are you sure you want to delete the following teacher?</p>
           <p>First Name:{teacher.first_name} </p>
           <p>Second Name: {teacher.second_name}</p>
           <p>Gender: {teacher.gender}</p>
           <p>Email: {teacher.email_address}</p>
           <p>Phone Number: {teacher.phone_number}</p>
           <p>Address: {teacher.address}</p>
         </div>
       )}
     </Modal>
   );
}

export default TeacherDeletePage;
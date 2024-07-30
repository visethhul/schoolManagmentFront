import React from "react";
import { Modal, Button } from "antd";

const TeacherViewPage = ({ open, onCancel, teacher }) => {
  return (
    <Modal
      titile="Teacher Detial"
      open={open}
      onCancel={onCancel}
      footer={[
        <Button key="close" onClick={onCancel}>
          Close
        </Button>,
      ]}
    >
      {teacher && (
        <>
          <p>
            <strong>First Name:</strong> {teacher.first_name}
          </p>
          <p>
            <strong>Second Name:</strong> {teacher.second_name}
          </p>
          <p>
            <strong>Gender:</strong> {teacher.gender}
          </p>
          <p>
            <strong>Email Address:</strong> {teacher.email_address}
          </p>
          <p>
            <strong>Phone Number:</strong> {teacher.phone_number}
          </p>
          <p>
            <strong>Address:</strong> {teacher.address}
          </p>
        </>
      )}
    </Modal>
  );
};
export default TeacherViewPage;

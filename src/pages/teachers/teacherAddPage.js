import React, { useState } from "react";
import { Modal, Form, Input, Button, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
//import CryptoJs from "crypto-js";
import { v4 as uuidv4 } from "uuid";

const TeacherAddPage = ({ open, onCancel, onSubmit, form }) => {
  const [fileList, setFileList] = useState([]);

  const handleUploadChange = ({ fileList }) => setFileList(fileList);

  const customRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  
  const handleFormSubmit = async(values) => {
    if (fileList.length > 0) {
       const file = fileList[0].originFileObj;
       const uniqueFileName = `${uuidv4()}-${file.name}`;
       //const reader = new FileReader();
       //reader.onload= (e)=> {
        //const fileData = e.target.result;
        //const encryptedData = CryptoJs.AES.encrypt(fileData,"wiso$%").toString();
        onSubmit({...values, image:file, imageName:uniqueFileName});
      } else{
      onSubmit(values);
    }
  };

  return (
    <Modal title="Add Teacher" visible={open} onCancel={onCancel} footer={null}>
      <Form
        form={form}
        onFinish={handleFormSubmit}
        layout="vertical"
      >
        <Form.Item
          name="first_name"
          label="First Name"
          rules={[{ required: true, message: "Please input the first name " }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="second_name"
          label="Second Name"
          rules={[{ required: true, message: "Please input the second name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Please input the gender" }]}
        >
          <Select>
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="email_address"
          label="Email"
          rules={[
            { required: true, message: "Please input the email address" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone_number"
          label="Phone Number"
          rules={[{ required: true, message: "Please input the phone number" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please input the address" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="image"
          label="Image"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
        >
          <Upload
            listType="picture"
            fileList={fileList}
            onChange={handleUploadChange}
            customRequest={customRequest}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Teacher
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TeacherAddPage;

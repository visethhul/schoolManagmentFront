import React, { useEffect, useState } from "react";
import { Button, Space, Table, Form, message  } from "antd";
//import axios from "axios";
import styles from "./TeacherPage.module.css";
import { ApiRequest } from "../../utils/apiRequest";
import TeacherViewPage from "./teacherViewPage";
import TeacherEditPage from "./teacherEditPage";
import TeacherDeletePage from "./teacherDeletePage";
import TeacherAddPage from "./teacherAddPage";
import TeacherSearch from "./teacherSearch";
import TeacherExportToFile from "./teacherExportToFile";
//import TeacherGenderFilter from "./teacherGenderFilter";

const TeachersTable = () => {
  // Stage Variables
  const [teachers, setTeachers] = useState([]); // List of teachers
  const [loading, setLoading] = useState(true); // Loading state
  const [isModalVisible, setIsModalVisible] = useState(false); //View modal visibility
  const [selectedTeacher, setSelectedTeacher] = useState(null); //Currently selected teacher
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); //Edit modal visibility
  const [isDeleteModalVisible, setIsDeleteModalVisible] =useState(false) //Delete modal visibility
  const [isAddModalVisible, setIsAddModalVisible] =  useState(false)  // Add modal visibility
  const [form] = Form.useForm(); // Form instance for managing form state
  const [currentPage, setCurrentPage ] = useState(1); // current page number
  const [pageSize, setPageSize ] = useState(10);
  const [ selectedGenders, setSelectedGenders] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); //selected row keys 
  
  //Fetch teachers data from the API on component mount
  useEffect(() => {
    //Fetch data from the API
    const fetchTeachers = async () => {
      try {
        const response = await ApiRequest("teacher", "GET");
        console.log("API response:", response);

        setTeachers(response.lists);
      } catch (err) {
        console.error("Error fetching teacher:", err);
      } finally {
        setLoading(false); //Set loading to false after fetching data
      }
    };
    fetchTeachers();
  }, []);

  // Handlers for view , edit , and delete actions
  const handleView = (record) => {
    setSelectedTeacher(record); // Set the selected teacher
    setIsModalVisible(true); // Show the view modal
  };
  const handleEdit = (record) => {
    setSelectedTeacher(record); // Set the seleted teacher
    form.setFieldsValue(record); // Populate form with selected teacher data
    setIsEditModalVisible(true); // Show the Edit modal
  };
  const handleDelete = (record) => {
    console.log("Delete Teacher", record);
    setSelectedTeacher(record); // set the seleted teacher
    setIsDeleteModalVisible(true); //Show the delete modal 
    
    // Implement delete functionality as required
  };

  // Handle to cancel modals
  const handleViewCancel = () => {
    setIsModalVisible(false); // Hide the view modal
    setSelectedTeacher(null); // Clear the selected teacher
  };
  const handleEditCancel = () => {
    setIsEditModalVisible(false); // Hide the edit Modal
    setSelectedTeacher(null); // Clear the selected teacher
    form.resetFields(); // Reset form fields
  };
  //Handle Delete Cancel modal 
  const handleDeleteCancel =()=>{
    setIsDeleteModalVisible(false); //Hide the delete modal
    setSelectedTeacher(null); // Clear the selected teacher
  }
   
  // Handler form submitting the edit form
  const handleEditSubmit = async (values) => {
    //update the eacher detail vai API
    console.log("Submite values", values);

    try {
      const response = await ApiRequest(
        `teacher/${selectedTeacher.id}`,
        "PUT",
        values
      );
      console.log("API Response", response);

      //Update the local state with the new data
      setTeachers((prevTeachers) =>
        prevTeachers.map((teacher) =>
          teacher.id === selectedTeacher.id
            ? { ...teacher, ...values }
            : teacher
        )
      );
      message.success("Teacher updated successfully"); //show success message
      setIsEditModalVisible(false); // Hide the edit modal
      setSelectedTeacher(null); // Clear the selected teacher
    } catch (err) {
      console.error("Error updating teacher", err);
      message.error("Failed to update teacher."); //show error message
    }
  };
  //Handle for confirming the delete action 
  const handleDeleteConfirm = async (teacher) =>{
    try {
      await ApiRequest(`teacher/${teacher.id}`,"DELETE"); //Delete the teacher via API 
      setTeachers((prevTeachers)=>
        prevTeachers.filter((t)=>t.id !== teacher.id) //Update the local state 
      );
        setIsDeleteModalVisible(false); // Hide the delete modal
        setSelectedTeacher(null); // Clear the seleted teacher 
        message.success("Teacher deleted successfully"); //show success message
    }catch(err){
      console.error("Error delete teacher",err);
      message.error("Failed to delete teacher"); // show error message

    }
  }
  // Handle for adding a new teacher 
  const handleAddSubmite = async(values)=>{
    
    try{
      const response = await ApiRequest("teacher","POST",values);
      console.log('API response:',response);
     // setTeachers((prevTeachers)=> [...prevTeachers,response.teacher]);
       setTeachers([...teachers, values]);
       setIsAddModalVisible(false) // hide the add modal
      form.resetFields();
      message.success("Teacher added successfully");

    }catch(err){
      console.error("Error adding teacher",err)
      message.error("Failed to add teacher ")
    }
  }
  //Pagination handler 
  const handleTableChange = (pagination,filters) =>{
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
    setSelectedGenders(filters.gender || []);
  }
  // Filtered teachers based on selected gender 
  const filteredTeachers = 
    selectedGenders.length === 0
   ?teachers
   :teachers.filter((teacher) =>
    selectedGenders.includes( teacher.gender.toLowerCase() ));
  
  
  //Get column Search Props 
  const { getColumnSearchProps } = TeacherSearch({
    handleSearch:(selectedKeys, confirm, dataIndex)=>{
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    },
    handleReset:(clearFilters)=>{
      clearFilters();
      setSearchText("");
    },
  });

  // Select row checkbox 
  const rowSelection ={
    selectedRowKeys,
    onChange:(selectedRowKeys)=>{
      setSelectedRowKeys(selectedRowKeys);
    },
    type:"checkbox",
  };

   // Table column definition
  const columns = [
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      ...getColumnSearchProps("first_name"),
    },
    {
      title: "Second Name",
      dataIndex: "second_name",
      key: "second_name",
      ...getColumnSearchProps("second_name"),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      filters: [
        { text: "Male", value: "male" },
        { text: "Female", value: "female" },
      ],
      filterMultiple: true, // Allow multiple selections
    },
    {
      title: "Email Address",
      dataIndex: "email_address",
      key: "email_address",
      ...getColumnSearchProps("email_address"),
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
      ...getColumnSearchProps("phone_number"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
    },
    {
      title:"active",
      dataIndex:"active",
      key:"active",
      render:(text,record)=>(
        <span style={{color:record.active ? "blue":"red"}}>
          {record.active? "Active": "Inactive" }
        </span>
      )
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (text, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleView(record)}>
            View
          </Button>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div className={styles["table-container"]}>
      <Space style={{ marginBottom: 20 }}>
        <Button type="primary" onClick={() => setIsAddModalVisible(true)}>
          Add Teacher
        </Button>
        <TeacherExportToFile
          teachers={teachers}
          selectedRowKeys={selectedRowKeys}
        />
      </Space>
      <Table
        rowSelection={rowSelection}
        columns={columns} // Teable columns definition
        dataSource={filteredTeachers} // Data source for the table
        loading={loading} //Loading state for the table
        rowKey="id" // Unique key for each row
        className={styles["ant-table"]} // Custom CSS class for the table
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: filteredTeachers.length,
          showSizeChanger: true,
        }} // pageination settings
        onChange={handleTableChange} //Pagination handler
      />
      {/**
       *   View Modal
       */}
      <TeacherViewPage
        open={isModalVisible}
        onCancel={handleViewCancel}
        teacher={selectedTeacher}
      />
      {/* Edit Modal */}
      <TeacherEditPage
        open={isEditModalVisible}
        onCancel={handleEditCancel}
        onSubmit={handleEditSubmit}
        form={form}
        selectedTeacher={selectedTeacher}
      />
      {/**Delete Modal */}
      <TeacherDeletePage
        open={isDeleteModalVisible} //Modal visibility
        onCancel={handleDeleteCancel} //cancel handle
        onConfirm={handleDeleteConfirm} //Confirm handler
        teacher={selectedTeacher} // Selected teacher data
      />
      {/**Add Modal */}
      <TeacherAddPage
        open={isAddModalVisible} // Modal visibility
        onCancel={() => setIsAddModalVisible(false)} //Cancel handle
        onSubmit={handleAddSubmite} //Sumit handler
        form={form} // Form instance
      />
    </div>
  );
};

export default TeachersTable;
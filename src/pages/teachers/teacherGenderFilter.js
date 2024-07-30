import React from "react";
import { Select } from "antd";
const { Option } = Select;

const TeacherGenderFilter = ({ selectedGender, setSeletedGender})=> {
            const handleGenderChange = (value)=>{
            setSeletedGender(value);
            }
  return (
    <Select 
    value={selectedGender}
    style={{ width: 120, marginBottom: 16 }}
    onChange={handleGenderChange}>
            
    <Option value="all">All</Option>
    <Option value="male">Male</Option>
    <Option value="female">Female</Option>
    </Select>
  );          
}
export default TeacherGenderFilter;
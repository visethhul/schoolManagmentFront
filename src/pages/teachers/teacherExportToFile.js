import React from "react";
import { Button, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";

const TeacherExportToFile = ({ teachers, selectedRowKeys }) => {
  const handleExportPDF = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select at least one teacher to export.");
      return;
    }

    const selectedTeachers = teachers.filter((teacher) =>
      selectedRowKeys.includes(teacher.id)
    );
    const doc = new jsPDF();
    const tableColumn = [
      "First Name",
      "Second Name",
      "Gender",
      "Email Address",
      "Phone Number",
      "Address",
    ];
    const tableRows = [];

    selectedTeachers.forEach((teacher) => {
      const teacherData = [
        teacher.first_name,
        teacher.second_name,
        teacher.gender,
        teacher.email_address,
        teacher.phone_number,
        teacher.address,
      ];
      tableRows.push(teacherData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Teachers", 14, 15);
    doc.save("teachers.pdf");
  };

  const selectedTeachers = teachers.filter((teacher) =>
    selectedRowKeys.includes(teacher.id)
  );

  return (
    <div>
      {selectedRowKeys.length === 0 ? (
        <Button
          style={{marginRight:8}}
          type="primary"
          icon={<DownloadOutlined />}
          onClick={() =>
            message.warning("Please select at least one teacher to export.")
          }
        >
          Export to CSV
        </Button>
      ) : (
        <CSVLink
          data={selectedTeachers}
          filename={"teachers.csv"}
          className="btn btn-primary"
          target="_blank"
        >
          <Button  type="primary" icon={<DownloadOutlined />}>
            Export to CSV
          </Button>
        </CSVLink>
      )}
      <Button
        type="primary"
        onClick={handleExportPDF}
        icon={<DownloadOutlined />}
      >
        Export to PDF
      </Button>
    </div>
  );
};

export default TeacherExportToFile;

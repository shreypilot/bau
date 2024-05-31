import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8002/student_result");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [
        [
          "Name",
          "Registration Number",
          "Father Name",
          "Total Marks",
          "Marks Obtained",
        ],
      ],
      body: data.map(
        ({
          name,
          registration_number,
          father_name,
          total_marks,
          marks_obtained,
        }) => [
          name,
          registration_number,
          father_name,
          total_marks,
          marks_obtained,
        ]
      ),
    });
    doc.save("student_results.pdf");
  };

  return (
    <div className="m-3 h-screen overflow-y-auto">
      <div className="w-full md:w-1/7">
        <div className="overflow-x-auto">
          <h1 className="text-2xl font-bold text-center my-4">
            Student Results
          </h1>
          <table className="w-11/12 mx-auto">
            <thead className="text-xs text-white uppercase bg-black">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Registration Number
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Father Name
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Total Marks
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Marks Obtained
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  } border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 `}
                >
                  <td className="px-4 py-2 text-center">{item.name}</td>
                  <td className="px-4 py-2 text-center">
                    {item.registration_number}
                  </td>
                  <td className="px-4 py-2 text-center">{item.father_name}</td>
                  <td className="px-4 py-2 text-center">{item.total_marks}</td>
                  <td className="px-4 py-2 text-center">
                    {item.marks_obtained}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end w-11/12 mx-auto">
            <button className="btn btn-Primary px-8 my-8" onClick={downloadPDF}>
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

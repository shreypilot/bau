import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1); // Track the index of the row being edited

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8002/getusers");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jsonData = await response.json();
      const initialData = jsonData.map((student) => ({
        ...student,
        marks_obtained: null,
      }));
      setData(initialData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleMarksChange = (index, value) => {
    const updatedData = [...data];
    updatedData[index].marks_obtained = value;
    setData(updatedData);
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
        ({ name, serial_number, father_name, total_marks, marks_obtained }) => [
          name,
          serial_number,
          father_name,
          "100",
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
                  serial Number
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Name
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
                  <td className="px-4 py-2 text-center">
                    {item.serial_number}
                  </td>
                  <td className="px-4 py-2 text-center">{item.name}</td>
                  <td className="px-4 py-2 text-center">{item.father_name}</td>
                  <td className="px-4 py-2 text-center">100</td>
                  <td className="px-4 py-2 text-center ">
                    {editingIndex === index ? (
                      <input
                        type="value"
                        value={item.marks_obtained || ""}
                        onChange={(e) =>
                          handleMarksChange(index, e.target.value)
                        }
                        className="w-16 text-center border border-blue-500 "
                      />
                    ) : (
                      <span
                        onClick={() => handleEdit(index)}
                        className="border-1 border-blue-500 px-4"
                      >
                          {item.marks_obtained || "0"}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end w-11/12 mx-auto">
            <button className="btn btn-primary px-8 my-8" onClick={downloadPDF}>
              Download Result
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

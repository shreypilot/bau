import React, { useState, useEffect } from "react";
import BAU from "../../assets/cdac-logo.jpeg";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null); // State to track the selected user ID for deletion
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State to track whether the delete modal is open

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
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteUser = async (id) => {
    setSelectedUserId(id); // Set the selected user ID
    setShowDeleteModal(true); // Open the delete modal
  };

  const confirmDeleteUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:8002/deleteuser/${selectedUserId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const deletedData = await response.json();
      console.log("User deleted:", deletedData);

      // Update the state to remove the deleted user
      setData(data.filter((user) => user.id !== selectedUserId));
      setShowDeleteModal(false); // Close the delete modal
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const closeModal = () => {
    setShowDeleteModal(false); // Close the delete modal
  };

  return (
    <div className="m-3">
      {/* Delete modal */}
      {showDeleteModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="p-6 rounded-lg shadow-lg text-black bg-white justify-center items-center flex flex-col">
            <h2 className="text-2xl font-bold mb-4">
              Are you sure you want to delete this user?
            </h2>
            <div className="mt-4 space-x-4">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={confirmDeleteUser}
              >
                Yes, Delete
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={closeModal}
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full md:w-1/7">
        <div className="overflow-x-auto">
          <table className="w-11/12 mx-auto">
            <thead className="text-xs text-white uppercase bg-black">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  Id
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Father Name
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Course
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Gender
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Image
                </th>
                <th scope="col" className="py-3 text-center">
                  Action
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
                  <th
                    scope="row"
                    className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                  >
                    {item.id}
                  </th>
                  <td className="px-4 py-2 text-center">{item.name}</td>
                  <td className="px-4 py-2 text-center">{item.father_name}</td>
                  <td className="px-4 py-2 text-center">{item.email}</td>
                  <td className="px-4 py-2 text-center">{item.course}</td>
                  <td className="px-4 py-2 text-center">{item.gender}</td>
                  <td className="px-4 py-2 text-center ">
                    <img
                      className="w-8 h-8 rounded-full block mx-auto"
                      src={BAU}
                      alt="Rounded avatar"
                    />
                  </td>
                  <td className="flex items-center py-2 my-2 justify-center">
                    <button
                      className="btn btn-success mr-5"
                      style={{ padding: "0.25rem 0.1rem", fontSize: "0.4rem" }}
                    >
                      <RemoveRedEyeIcon />
                    </button>
                    <NavLink to={`/edit/${item.id}`}>
                      <button
                        className="btn btn-primary mr-5"
                        style={{
                          padding: "0.25rem 0.1rem",
                          fontSize: "0.4rem",
                        }}
                      >
                        <CreateIcon />
                      </button>
                    </NavLink>

                    <button
                      className="btn btn-danger"
                      style={{ padding: "0.25rem 0.1rem", fontSize: "0.4rem" }}
                      onClick={() => deleteUser(item.id)}
                    >
                      <DeleteOutlineIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

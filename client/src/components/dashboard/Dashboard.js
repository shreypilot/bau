import React, { useState, useEffect } from "react";
import BAU from "../../assets/cdac-logo.jpeg";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { NavLink } from "react-router-dom";
import NotFound from "../NotFound";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = ({ searchResults, noResults }) => {
  const [data, setData] = useState([]);

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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
    setSelectedUserId(id);
    setShowDeleteModal(true);
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

      setData(data.filter((user) => user.serial_number !== selectedUserId));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const viewUserDetails = (user) => {
    setSelectedUser(user);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
  };
   useEffect(() => {
     fetchData();
     if (noResults) {
       toast.error("User not found");
     }
   }, [noResults]);

  return (
    <div className="m-3 h-screen overflow-y-auto relative">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
                onClick={closeDeleteModal}
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showDetailModal && selectedUser && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="p-6 relative rounded-lg shadow-lg text-black bg-white w-72">
            <div
              className="absolute top-0 right-2 text-2xl font-bold cursor-pointer"
              onClick={closeDetailModal}
            >
              &times;
            </div>
            <div className="flex flex-col items-center mb-4">
              <img
                className="w-16 h-16 rounded-full mb-2"
                src={BAU}
                alt="User avatar"
              />
              <div className="text-lg font-semibold">{selectedUser.name}</div>
              <div className="text-sm text-gray-500">
                {selectedUser.serial_number}
              </div>
            </div>
            <div className="flex gap-1 mb-2">
              <div>
                <strong>Father's Name:</strong>
              </div>
              <div>{selectedUser.father_name}</div>
            </div>
            <div className="flex gap-1 mb-2">
              <div>
                <strong>Gender:</strong>
              </div>
              <div>{selectedUser.gender}</div>
            </div>
            <div className="flex gap-1 mb-2">
              <strong>Email:</strong> {selectedUser.email}
            </div>
          </div>
        </div>
      )}

      <div className="w-full md:w-1/7">
        <div className="overflow-x-auto">
          <table className="w-full mx-auto">
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
              {(searchResults.length > 0 ? searchResults : data).map(
                (item, index) => (
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
                      {item.serial_number}
                    </th>
                    <td className="px-4 py-2 text-center">{item.name}</td>
                    <td className="px-4 py-2 text-center">
                      {item.father_name}
                    </td>
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
                        style={{
                          padding: "0.25rem 0.1rem",
                          fontSize: "0.4rem",
                        }}
                        onClick={() => viewUserDetails(item)}
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
                        style={{
                          padding: "0.25rem 0.1rem",
                          fontSize: "0.4rem",
                        }}
                        onClick={() => deleteUser(item.serial_number)}
                      >
                        <DeleteOutlineIcon />
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      
        
      </div>
    </div>
  );
};

export default Dashboard;


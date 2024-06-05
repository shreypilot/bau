import React, { useState } from "react";
import swami from "../../assets/swami.jpeg";
import BauLogo from "../../assets/logo.png";
import sign from "../../assets/Signature.jpg";
import logo from "../../assets/bau.jpeg";

const AdmitCard = () => {
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8002/getusers?email=${email}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jsonData = await response.json();
      setUserData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  const handleDownload = () => {
    // Implement download functionality here
    // For simplicity, let's assume userData contains the necessary information for the admit card
    // You can create a PDF or an image based on the userData and allow the user to download it
  };

  return (
    <section className="bg-gray-100">
      <div className="container mx-auto">
        <div className="admit-card border-2 border-black p-6 mb-6">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-black px-4 py-2"
            />
            <button
              onClick={handleSearch}
              className="ml-2 px-4 py-2 bg-blue-500 text-white"
            >
              Search
            </button>
          </div>

          {userData && (
            <div>
              <section className="bg-gray-100">
                <div className="container mx-auto">
                  <div className="admit-card border-2 border-black p-6 mb-6">
                    <div className="flex justify-between items-center mb-2 ">
                      <div className="w-1/3 text-center">
                        <img
                          src={logo}
                          alt="Mewar University"
                          className="h-20 border-2 border-black"
                        />
                      </div>

                      <div className="w-1/3 text-center">
                        <div className="bg-info">
                          <h4 className="uppercase ">
                            Bihar Agricultural University
                          </h4>
                        </div>
                        <div>
                          {" "}
                          <h6 className="uppercase text-danger">
                            Common University Entrance Test
                          </h6>
                        </div>
                      </div>
                      <div className="w-1/3 ">
                        <img
                          src={logo}
                          alt="Mewar University"
                          className="h-20 border-2 border-black "
                        />
                      </div>
                    </div>
                    <div className="border-2 border-black mb-2">
                      <div class="container">
                        <div class="row">
                          <div class="col-sm-3 border-2 border-black">
                            Appl Reg No.
                          </div>
                          <div class="col-sm-3 border-2 border-black">
                            {userData[0].serial_number}
                          </div>
                          <div class="col-sm-3 border-2 border-black">
                            Hall Ticket No.
                          </div>
                          <div class="col-sm-3 border-2 border-black">
                            DL2310DEL155SSA1161
                          </div>
                        </div>
                      </div>
                      <div class="container mt-2">
                        <div class="row">
                          <div class="col-sm-3 border-2 border-black">Name</div>
                          <div class="col-sm-9 border-2 border-black text-danger">
                            <b>{userData[0].name}</b>
                          </div>
                        </div>
                      </div>
                      <div class="container mt-2">
                        <div class="row">
                          <div class="col-sm-3 border-2 border-black">
                            Father's Name
                          </div>
                          <div class="col-sm-9 border-2 border-black">
                            {userData[0].father_name}
                          </div>
                        </div>
                      </div>
                      <div class="container mt-2"></div>
                      <div className=" mb-6 flex justify-between">
                        <div className="w-3/4">
                          <table className="w-full">
                            <tbody>
                              <tr>
                                <td className="border border-black font-bold">
                                  ENROLLMENT NO: {userData[0].serial_number}
                                </td>
                                <td className="border border-black font-bold">
                                  Course: {userData[0].course}
                                </td>
                              </tr>
                              <tr>
                                <td className="border border-black font-bold">
                                  Student Name: {userData[0].name}
                                </td>
                                <td className="border border-black font-bold">
                                  Sex:{userData[0].gender}
                                </td>
                              </tr>
                              <tr>
                                <td className="border border-black font-bold">
                                  Father/Husband Name: Abushahma
                                </td>
                                <td className="border border-black font-bold">
                                  DOB: {userData[0].formatted_dob}
                                </td>
                              </tr>
                              <tr>
                                <td className="border border-black font-bold">
                                  Category: {userData[0].category}
                                </td>
                                <td className="border border-black font-bold">
                                  Email: {userData[0].email}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  colSpan="2"
                                  className="border border-black"
                                  style={{ height: "125px" }}
                                >
                                  {userData[0].district},{userData[0].state}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="w-2/4 text-center ml-2  ">
                          <table className="w-full">
                            <tbody>
                              <tr>
                                <td
                                  className="border border-black "
                                  style={{ height: "230px", weight: "230" }}
                                >
                                  <img
                                    src={swami}
                                    alt="Student"
                                    style={{
                                      height: "230px",
                                      weight: "230",
                                      margin: "auto",
                                    }}
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div className="border-2 border-black p-6 mb-6 text-center">
                      <h5 className="uppercase">EXAMINATION VENUE</h5>
                      <p>
                        Padmayani Edutech Pvt Ltd
                        <br />
                        tridev mandir double transfermer new, Jaganpura Rd,
                        Patna, Bihar 800027
                      </p>
                    </div>
                    <div className="border-2 border-black p-6 mb-6 text-center">
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th className="border border-black">Sr. No.</th>
                            <th className="border border-black">
                              Subject/Paper
                            </th>
                            <th className="border border-black">Exam Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-black">1</td>
                            <td className="border border-black">English</td>
                            <td className="border border-black">5 July 2019</td>
                          </tr>
                          <tr>
                            <td className="border border-black">2</td>
                            <td className="border border-black">English</td>
                            <td className="border border-black">5 July 2019</td>
                          </tr>
                          <tr>
                            <td className="border border-black">3</td>
                            <td className="border border-black">English</td>
                            <td className="border border-black">5 July 2019</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <footer className="text-center">
                      <p>*** MEWAR UNIVERSITY ***</p>
                    </footer>
                  </div>
                </div>
              </section>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-blue-500 text-white"
              >
                Download Admit Card
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdmitCard;

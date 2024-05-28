import React from "react";
import swami from "../../assets/swami.jpeg";
import BauLogo from "../../assets/logo.png";
import sign from "../../assets/Signature.jpg";
import logo from "../../assets/bau.jpeg";

const AdmitCard = () => {
  return (
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
                <h4 className="uppercase ">Bihar Agricultural University</h4>
              </div>
              <div>
                {" "}
                <h6 className="uppercase text-danger">
                  Common University Entrance Test
                </h6>
              </div>
              {/* <p>B.Sc - 2024</p> */}
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
              <div class="col-sm-3 border-2 border-black">Appl Reg No.</div>
              <div class="col-sm-3 border-2 border-black">23070023354</div>
              <div class="col-sm-3 border-2 border-black">Hall Ticket No.</div>
              <div class="col-sm-3 border-2 border-black">
                DL2310DEL155SSA1161
              </div>
            </div>
          </div>
          <div class="container mt-2">
            <div class="row">
              <div class="col-sm-3 border-2 border-black">Name</div>
              <div class="col-sm-9 border-2 border-black text-danger">
                <b>Priya Chauhan</b>
              </div>
            </div>
          </div>
          <div class="container mt-2">
            <div class="row">
              <div class="col-sm-3 border-2 border-black">Father's Name</div>
              <div class="col-sm-9 border-2 border-black">Hemraj Singh</div>
            </div>
          </div>
          <div class="container mt-2">
            <div class="row">
              <div class="col-sm-3 border-2 border-black">Mother's Name</div>
              <div class="col-sm-9 border-2 border-black">Seema Rani</div>
            </div>
          </div>
          <div className=" mb-6 flex justify-between">
            <div className="w-3/4">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="border border-black font-bold">
                      ENROLLMENT NO: 9910101
                    </td>
                    <td className="border border-black font-bold">
                      Course: B.Sc
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-black font-bold">
                      Student Name: Aditya Nath Swami
                    </td>
                    <td className="border border-black font-bold">Sex: M</td>
                  </tr>
                  <tr>
                    <td className="border border-black font-bold">
                      Father/Husband Name: Abushahma
                    </td>
                    <td className="border border-black font-bold">
                      DOB: 10 Jul 1996
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-black font-bold">
                      Category: OBC
                    </td>
                    <td className="border border-black font-bold">
                      Email: aditya@gmail.com
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan="2"
                      className="border border-black"
                      style={{ height: "125px" }}
                    >
                      Address: Padmayani Edutech Pvt Ltd
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
                      {/* <img
                        // src={swami}
                        alt="Student"
                        // className="w-full "
                        style={{ height: "230px",weight:"230" }}
                       
                      /> */}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="border border-black"
                      style={{ height: "70px" }}
                    >
                      {/* <img
                        // src={sign}
                        alt="Signature"
                        className="w-full "
                        style={{ height: "70px" }}
                      /> */}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* <div className="border-2 border-black p-6 mb-2">
            <h5 className="uppercase">Enrollment No: 9910101</h5>
          </div> */}
          
           
            <div className="w-1/4 text-center ml-2">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="border border-black">
                      <img
                        src={swami}
                        alt="Student"
                        // className="w-full "
                        style={{
                          height: "230px",
                          weight: "230",
                          margin: "auto",
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-black">
                      <img
                        src={sign}
                        alt="Signature"
                        className="w-full "
                        style={{ height: "70px" }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>



          <div className="border-2 border-black p-6 mb-6 text-center">
            <h5 className="uppercase">EXAMINATION VENUE</h5>
            <p>
              Padmayani Edutech Pvt Ltd
              <br />
              tridev mandir double transfermer new, Jaganpura Rd, Patna, Bihar
              800027
            </p>
          </div>
          <div className="border-2 border-black p-6 mb-6 text-center">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="border border-black">Sr. No.</th>
                  <th className="border border-black">Subject/Paper</th>
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
  );
};
export default AdmitCard;

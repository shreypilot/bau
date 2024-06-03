const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../config/db");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    connection.query(
      "SELECT * FROM employees WHERE email = ?",
      [email], // Correctly pass email as an array
      async (err, result) => {
        if (err) {
          throw err;
        }

        if (result.length === 0) {
          return res.status(404).json({ error: "User not found" });
        }

        const user = result[0];

        //Check if the user is already logged in
        if (user.token) {
          return res.status(403).json({ error: "User is already logged in" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          const token = jwt.sign({ userId: user.id }, "your_secret_key_here", {
            expiresIn: "1h",
          });

          // Save token to the database
          connection.query(
            "UPDATE employees SET token = ? WHERE id = ?",
            [token, user.id],
            (err) => {
              if (err) {
                throw err;
              }
              res.status(200).json({ message: "Login successful", token });
            }
          );
        } else {
          res.status(401).json({ error: "Incorrect password" });
        }
      }
    );
  } catch (error) {
    console.error("Error occurred during login:", error);
    res.status(500).json({ error: "Error occurred during login" });
  }
});

router.post("/logout", async (req, res) => {
  try {
    const { token } = req.body;

    connection.query(
      "UPDATE employees SET token = NULL WHERE token = ?",
      [token], // Correctly pass token as an array
      (err) => {
        if (err) {
          throw err;
        }
        res.status(200).json({ message: "Logout successful" });
      }
    );
  } catch (error) {
    console.error("Error occurred during logout:", error);
    res.status(500).json({ error: "Error occurred during logout" });
  }
});

router.post("/register/user", upload.single("fileUpload"), (req, res) => {
  try {
    if (!req.file) {
      throw new Error("No file uploaded");
    }

    const {
      serial_number,
      salutation,
      name,
      fatherName,
      category,
      gender,
      dob,
      email,
      mobileNumber,
      course,
      state,
      district,
    } = req.body;

    const formattedDOB = new Date(dob).toISOString().split("T")[0];
    const image = req.file.filename;

    const sql =
      "INSERT INTO student_info (serial_number, salutation, name, father_name, category, gender, formatted_dob, email, mobile_number, course, image, state, district) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      serial_number,
      salutation,
      name,
      fatherName,
      category,
      gender,
      formattedDOB,
      email,
      mobileNumber,
      course,
      image,
      state,
      district,
    ];

    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error occurred during user registration:", err);
        return res
          .status(500)
          .json({ error: "Error occurred during user registration" });
      }
      res.status(200).json({ message: "User registered successfully" });
    });
  } catch (error) {
    console.error("Error occurred during user registration:", error);
    res.status(500).json({ error: "Error occurred during user registration" });
  }
});

router.post("/register/employee", upload.single("fileUpload"), (req, res) => {
  try {
    if (!req.file) {
      throw new Error("No file uploaded");
    }

    const {
      salutation,
      name,
      fatherName,
      department,
      dob,
      email,
      mobileNumber,
      password,
    } = req.body;
    const formattedDOB = new Date(dob).toISOString().split("T")[0];

    const image = req.file.filename;

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        throw err;
      }

      const sql =
        "INSERT INTO employees (salutation, name, father_name, department, dob, email, mobile_number, image, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const values = [
        salutation,
        name,
        fatherName,
        department,
        formattedDOB,
        email,
        mobileNumber,
        image,
        hash,
      ];

      connection.query(sql, values, (err, result) => {
        if (err) {
          throw err;
        }
        res.status(200).json({ message: "Employee registered successfully" });
      });
    });
  } catch (error) {
    console.error("Error occurred during employee registration:", error);
    res
      .status(500)
      .json({ error: "Error occurred during employee registration" });
  }
});

module.exports = router;

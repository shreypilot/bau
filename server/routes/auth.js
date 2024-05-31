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
      email,
      async (err, result) => {
        if (err) {
          throw err;
        }

        if (result.length === 0) {
          return res.status(404).json({ error: "User not found" });
        }

        const user = result[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          const token = jwt.sign({ userId: user.id }, "your_secret_key_here", {
            expiresIn: "1h",
          });

          res.status(200).json({ message: "Login successful", token });
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

router.post("/register/user", upload.single("fileUpload"), (req, res) => {
  try {
    if (!req.file) {
      throw new Error("No file uploaded");
    }

    const {
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
      null, // serial_number should be auto-generated
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

router.post("/register/employee", async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    connection.query(
      "INSERT INTO employees (email, password) VALUES (?, ?)",
      [email, hashedPassword],
      (err, result) => {
        if (err) {
          console.error("Error occurred during employee registration:", err);
          return res
            .status(500)
            .json({ error: "Error occurred during employee registration" });
        }
        res.status(200).json({ message: "Employee registered successfully" });
      }
    );
  } catch (error) {
    console.error("Error occurred during employee registration:", error);
    res
      .status(500)
      .json({ error: "Error occurred during employee registration" });
  }
});

module.exports = router;

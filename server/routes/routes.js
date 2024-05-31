const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const bcrypt = require("bcrypt");
const cors = require("cors"); // Import the CORS middleware
const jwt = require("jsonwebtoken");

// Database connection
const connection = require("../config/db");
const router = express.Router();

// Middleware
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cors()); // Use the CORS middleware

// File upload setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const getNextSerialNumber = (role) => {
  try {
    // Fetch the current maximum serial number for the given role
    const sql = `SELECT MAX(id) AS max_id FROM ${role}s`;
    const result = connection.query(sql);

    if (!result || !result[0] || result[0].max_id === null) {
      // If no records found, start with id 1
      return `BAU${new Date().getFullYear().toString().substr(0)}0001`;
    }

    let maxId = result[0].max_id;

    // Extract the current year
    const currentYear = new Date().getFullYear().toString().substr(-2);

    // Increment the maximum id
    maxId++;

    // Format the new serial number
    const newSerialNumber = `BAU${currentYear}${maxId
      .toString()
      .padStart(4, "0")}`;

    return newSerialNumber;
  } catch (error) {
    throw error;
  }
};

// Login route

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fetch user record from the database based on the provided email
    connection.query(
      "SELECT * FROM employees WHERE email = ? ",
      email,
      async (err, result) => {
        if (err) {
          throw err;
        }

        if (result.length === 0) {
          // User not found
          return res.status(404).json({ error: "User not found" });
        }

        const user = result[0];
        // Compare hashed password from the database with provided password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          // Passwords match, user authenticated
          // Generate JWT token
          const token = jwt.sign({ userId: user.id }, "your_secret_key_here", {
            expiresIn: "1h", // Token expiration time
          });

          // Send the token as a response
          res.status(200).json({ message: "Login successful", token });
        } else {
          // Passwords don't match
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
    const image = req.file.filename; // Uploaded file name

    // Generate serial number
    const serialNumber = getNextSerialNumber();

    // Insert user data into database
    const sql =
      "INSERT INTO student_info (serial_number, salutation, name, father_name, category, gender, dob, email, mobile_number, course, image, state, district) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      id,
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

    const image = req.file.filename; // Uploaded file name

    // Encrypt password
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        throw err;
      }

      // Insert employee data into database
      const sql =
        "INSERT INTO employees (salutation, name, father_name, department, dob, email, mobile_number, image, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
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

router.get("/getusers", (req, res) => {
  connection.query("SELECT * FROM student_info", (err, result) => {
    if (err) {
      res.status(422).json("no data available");
    } else {
      res.status(201).json(result);
    }
  });
});

// user delete api

router.delete("/deleteuser/:id", (req, res) => {
  const { id } = req.params;

  connection.query(
    "DELETE FROM student_info WHERE id = ? ",
    id,
    (err, result) => {
      if (err) {
        res.status(422).json("error");
      } else {
        res.status(201).json(result);
      }
    }
  );
});
// get single user

router.get("/induser/:id", (req, res) => {
  const { id } = req.params;

  connection.query(
    "SELECT * FROM student_info WHERE id = ? ",
    id,
    (err, result) => {
      if (err) {
        res.status(422).json("error");
      } else {
        res.status(201).json(result);
      }
    }
  );
});
router.get("/searchusers", (req, res) => {
  const { name, serial_number } = req.query;

  let sql = "SELECT * FROM student_info WHERE 1=1";
  const values = [];

  if (name) {
    sql += " AND name LIKE ?";
    values.push(`%${name}%`);
  }

  if (serial_number) {
    sql += " AND serial_number = ?";
    values.push(serial_number);
  }

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error occurred during user search:", err);
      res.status(500).json({ error: "Error occurred during user search" });
    } else {
      res.status(200).json(result);
    }
  });
});
// update users api
router.patch("/updateuser/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      salutation,
      name,
      father_name,
      category,
      gender,
      dob,
      email,
      mobile_number,
      course,
    } = req.body;

    const formattedDOB = new Date(dob).toISOString().split("T")[0];

    let image = req.body.image; // Use existing image if no new image is uploaded
    if (req.file) {
      image = req.file.filename; // Uploaded file name
    } else {
      console.log("No file uploaded");
    }

    const sql = `
      UPDATE student_info
      SET salutation = ?,
          name = ?,
          father_name = ?,
          category = ?,
          gender = ?,
          dob = ?,
          email = ?,
          mobile_number = ?,
          course = ?,
          image = ?
          state = ?
          district = ?
      WHERE id = ?
    `;

    const values = [
      salutation,
      name,
      father_name,
      category,
      gender,
      formattedDOB,
      email,
      mobile_number,
      course,
      image,
      id,
    ];

    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error occurred during user update:", err);
        return res
          .status(500)
          .json({ error: "Error occurred during user update" });
      }
      res.status(200).json({ message: "User updated successfully" });
    });
  } catch (error) {
    console.error("Error occurred during user update:", error);
    res.status(500).json({ error: "Error occurred during user update" });
  }
});

module.exports = router;

const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const bcrypt = require("bcrypt");
const cors = require("cors"); // Import the CORS middleware

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



// Login route
router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;

    // Fetch user record from the database based on the provided email
    connection.query("SELECT * FROM users1 WHERE email = ? ", email, async (err, result) => {
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
        res.status(200).json({ message: "Login successful" });
      } else {
        // Passwords don't match
        res.status(401).json({ error: "Incorrect password" });
      }
    });
  } catch (error) {
    console.error("Error occurred during login:", error);
    res.status(500).json({ error: "Error occurred during login" });
  }
});


// Register route
router.post("/register", upload.single("fileUpload"), (req, res) => {
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
      password,
    } = req.body;
    const formattedDOB = new Date(dob).toISOString().split("T")[0];

    const image = req.file.filename; // Uploaded file name

    // Encrypt password
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        throw err;
      }

      // Insert user data into database
      const sql =
        "INSERT INTO users1 (salutation, name, father_name, category, gender, dob, email, mobile_number, course, image, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const values = [
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
        hash,
      ];

      connection.query(sql, values, (err, result) => {
        if (err) {
          throw err;
        }
        res.status(200).json({ message: "User registered successfully" });
      });
    });
  } catch (error) {
    console.error("Error occurred during registration:", error);
    res.status(500).json({ error: "Error occurred during registration" });
  }
});

// get userdata

router.get("/getusers", (req, res) => {
  connection.query("SELECT * FROM users1", (err, result) => {
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

  connection.query("DELETE FROM users1 WHERE id = ? ", id, (err, result) => {
    if (err) {
      res.status(422).json("error");
    } else {
      res.status(201).json(result);
    }
  });
});
// get single user

router.get("/induser/:id", (req, res) => {
  const { id } = req.params;

  connection.query("SELECT * FROM users1 WHERE id = ? ", id, (err, result) => {
    if (err) {
      res.status(422).json("error");
    } else {
      res.status(201).json(result);
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
      UPDATE users1
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

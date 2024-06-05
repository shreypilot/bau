// user.js

const express = require("express");
const router = express.Router();
const multer = require("multer");
const connection = require("../config/db");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); 
  },
});

const upload = multer({ storage: storage });

router.get("/getusers", (req, res) => {
  let sql = "SELECT * FROM student_info";

  const email = req.query.email;
  if (email) {
    sql += " WHERE email = ?";
  }

  connection.query(sql, [email], (err, result) => {
    if (err) {
      console.error("Error occurred while fetching user data:", err);
      res
        .status(500)
        .json({ error: "Error occurred while fetching user data" });
    } else {
      if (result.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(result);
    }
  });
});

router.get("/student_result", (req, res) => {
  connection.query("SELECT * FROM student_result", (err, result) => {
    if (err) {
      console.error("Error occurred while fetching users:", err);
      res.status(500).json({ error: "Error occurred while fetching users" });
    } else {
      res.status(200).json(result);
    }
  });
});
router.delete("/deleteuser/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "DELETE FROM student_info WHERE serial_number = ?",
    id,
    (err, result) => {
      if (err) {
        console.error("Error occurred while deleting user:", err);
        res.status(500).json({ error: "Error occurred while deleting user" });
      } else {
        res.status(200).json({ message: "User deleted successfully" });
      }
    }
  );
});

router.get("/induser/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM student_info WHERE id = ?",
    id,
    (err, result) => {
      if (err) {
        console.error("Error occurred while fetching user:", err);
        res.status(500).json({ error: "Error occurred while fetching user" });
      } else {
        res.status(200).json(result);
      }
    }
  );
});

router.get("/searchusers", (req, res) => {
  const { query } = req;
  const { name, serial_number } = query;

  if (!name && !serial_number) {
    return res
      .status(400)
      .json({ error: "Name or serial number is required for search" });
  }

  let sql = "SELECT * FROM student_info WHERE";
  let params = [];

  if (name) {
    sql += " name LIKE ?";
    params.push(`%${name}%`);
  }

  if (serial_number) {
    if (params.length > 0) {
      sql += " OR";
    }
    sql += " serial_number = ?";
    params.push(serial_number);
  }

  connection.query(sql, params, (err, result) => {
    if (err) {
      console.error("Error occurred while searching users:", err);
      res.status(500).json({ error: "Error occurred while searching users" });
    } else {
      res.status(200).json(result);
    }
  });
});


router.patch("/updateuser/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const image = req.file ? req.file.filename : null;

  let sql = "UPDATE student_info SET";
  const values = [];

  if (name) {
    sql += " name = ?,";
    values.push(name);
  }

  if (email) {
    sql += " email = ?,";
    values.push(email);
  }

  if (image) {
    sql += " image = ?,";
    values.push(image);
  }

  sql = sql.slice(0, -1); 
  sql += " WHERE id = ?";
  values.push(id);

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error occurred while updating user:", err);
      res.status(500).json({ error: "Error occurred while updating user" });
    } else {
      res.status(200).json({ message: "User updated successfully" });
    }
  });
});

module.exports = router;

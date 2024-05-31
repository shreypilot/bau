const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  user: process.env.DB_USER,  
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }

  console.log('Connected to database.');

  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS student_info (
 id INT AUTO_INCREMENT PRIMARY KEY,
    salutation VARCHAR(10),
    name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255) NOT NULL,  
    category VARCHAR(50) NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    dob DATE NOT NULL,
    email VARCHAR(255) NOT NULL,
    mobile_number VARCHAR(15) NOT NULL,
    course VARCHAR(100) NOT NULL,
    image VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    serial_number VARCHAR(20),
    state VARCHAR(50),
    district VARCHAR(50)
  );
 

  `;

  connection.query(createTableQuery, (err, results, fields) => {
    if (err) {
      console.error('Error creating table: ' + err.stack);
    } else {
      console.log('Table created successfully.');
    }
  });
});

// Export the connection for reuse in other modules
module.exports = connection;

// filepath: /c:/Users/imnah/Desktop/My Projects/school-website/project/model/db.js
const mysql = require("mysql2");

const dbConfig = {
  host: "localhost", // Or your database host
  user: "root", // Your database username
  password: "", // Your database password
  database: "sjs", // Your database name
};

const pool = mysql.createPool(dbConfig);

// Test the database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database!");
  connection.release();
});

// Function to execute queries
const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
};

module.exports = {
  query,
};

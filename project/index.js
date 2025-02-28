// filepath: /c:/Users/imnah/Desktop/My Projects/school-website/project/index.js
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path"); // Import the 'path' module
const db = require("./model/db"); // Import the db module
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Set the views directory

// Routes
app.get("/", (req, res) => {
  res.render("index", { title: "Saint Joseph School" }); // Render the index.ejs template
});

app.get("/aboutUs", (req, res) => {
  res.render("aboutUs", { title: "About Us" });
});

app.get("/programs", (req, res) => {
  res.render("programs", { title: "Programs" });
});

app.get("/contactUs", (req, res) => {
  res.render("contactUs", { title: "Contact Us" });
});

app.post("/contactUs", async (req, res) => {
  // Process the contact form submission here
  const { name, email, subject, message } = req.body;

  // SQL query to insert data into the messages table
  const sql =
    "INSERT INTO messages (Name, email, subject, message) VALUES (?, ?, ?, ?)";

  try {
    // Execute the query using the db.query function
    await db.query(sql, [name, email, subject, message]);
    console.log("Data inserted successfully!");
    res.send("Thank you for your message!"); // Or redirect to a thank you page
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).send("Error submitting the form.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

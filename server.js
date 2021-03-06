const express = require("express");
// Imports and requires mysql2 module
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connects to the database server
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0000",
  database: "movie_db",
});

// Checks if an error occurred while connecting to the database server
db.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to database");
  }
});

// Get all the movies in the database
app.get("/api/movies", (req, res) => {
  db.query("SELECT * FROM movies", function (err, results) {
    if (err) {
      console.log(err);
    } else {
      res.json(results);
    }
  });
});

// Adds a review to a movie in the database 
app.post("/api/add-movie", (req, res) => {
  db.query(
    `INSERT INTO movies (movie_name)
    VALUES (?)`, req.body.movie,
    function (err, results) {
      if (err) {
        console.log(err);
      } else {
        res.json(`The ${req.body.movie} movie was added to the Database Successfully!`);
      }
    }
  );
});


// Updates a review to a movie by id
app.post("/api/update-review", (req, res) => {
    db.query(
      `UPDATE reviews SET review = ? WHERE id = ?`, [req.body.review, req.body.id],
      function (err, results) {
        if (err) {
          console.log(err);
        } else {
          res.json(`The review to the Database Successfully!`);
        }
      }
    );
  });


  // Deletes a movie by id
  app.delete("/api/movie/:id", (req, res) => {
      const {id} = req.params;
    db.query(
      `DELETE FROM movies WHERE id = ?`, id,
      function (err, results) {
        if (err) {
          console.log(err);
        } else {
          res.json(`This movie was deleted from the Database Successfully!`);
        }
      }
    );
  });

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Listens to the port
app.listen(PORT, () => {
  console.log(`connected to port ${PORT}`);
});

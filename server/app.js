const express = require('express'); 
const app = express(); 
require('dotenv').config()
const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL)
const cors = require('cors');

  connection.connect();
  app.use(express.json());
  app.use(cors());

  app.get('/businesses', (req, res) => { 
    const sql = 'SELECT * FROM Businesses'; 
    connection.query(sql, (error, results) => { 
      if (error) throw error; 
      res.send(results); 
    }); 
  }); 
   
  app.listen(3001, () => { 
    console.log('Server running on port 3001'); 
  }); 
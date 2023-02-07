const { request } = require('express');
const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mysql = require('mysql');
// app.use(express.static('public'));
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Ananya9874',
  database: 'acmewebsite2'
});

try {
    connection.connect();
    // console.log('hello')
} catch (error) {
    console.error(error)
}




app.get('/products', (req, res) => {

  const filter = req.query.filter;
  let query ='SELECT * FROM products'
  // console.log('here')
  switch (filter) {
    case 'all':
      connection.query = 'SELECT * FROM products';
      break;
    case 'gift-cards':
      query = 'SELECT * FROM products WHERE category = "gift-cards"';
      break;
    case 'tents':
      query = 'SELECT * FROM products WHERE category = "tents"';
      break;
    case 'accessories':
      query = 'SELECT * FROM products WHERE category = "accessories"';
      break;
    case 'packs':
      query = 'SELECT * FROM products WHERE category = "packs"';
      break;
    default:
      return res.status(400).json({ error: 'Invalid filter' });
  }

  connection.query(query, (error, results) => {
    console.log(error)
    if (error) {
      return res.status(500).json({ error: 'Error fetching data from database' });

    }
    res.json(results);
  });



});


app.post('/cart', (req,res) => {
  console.log(req.body)
  // addToCart(req.body);
  // res.send(req.body)
const data =req.body
  const fetchQuery = `INSERT INTO cart SET ?`;
  // const fetchQuery = `SELECT * FROM cart`;
  connection.query(fetchQuery , data, (error, result) => {
    if (error) {
      console.error(error);
    } else {
      res.send('data added to db')
      console.log('Data written to the database.',result);
    }
  
  });

  
});


function fetchCartDb(data) {

  console.log('hello')
    // const data = { product_name: 'test product', price: 30 , stock: 1};
  
    // const fetchQuery = `INSERT INTO cart SET ?`;
    const fetchQuery = `SELECT * FROM cart`;
    connection.query(fetchQuery , data, (error, result) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Data written to the database.',result);
      }
    
    });
  
  }
  
  fetchCartDb();




  app.post('/contact', (req,res) => {
    console.log(req.body)
    // addToCart(req.body);
    // res.send(req.body)
  const data =req.body
    const fetchQuery = `INSERT INTO contact SET ?`;
    // const fetchQuery = `SELECT * FROM cart`;
    connection.query(fetchQuery , data, (error, result) => {
      if (error) {
        console.error(error);
      } else {
        res.send('data added to db')
        console.log('Data written to the database.',result);
      }
    
    });
  
    
  });
  



function fetchContactDb(data) {

  console.log('hello')
    // const data = { product_name: 'test product', price: 30 , stock: 1};
  
    // const fetchQuery = `INSERT INTO cart SET ?`;
    const fetchQuery = `SELECT * FROM contact`;
    connection.query(fetchQuery , data, (error, result) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Data written to the database.',result);
      }
    
    });
  
  }
  
  fetchContactDb();

const port = process.env.PORT || 3000;
app.listen(port,() => console.log('API running on port 3000'));

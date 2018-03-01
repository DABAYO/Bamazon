const mysql = require('mysql');
const inquirer = require('inquirer');
const Table = require('cli-table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Your password
    password: '1234',
    database: 'bamazon_db'
  });

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  displayProducts();
});

// // test sql connection
// console.log ('connected as id' + connection.threadid); 


function displayProducts() {
  //show all products from database.
  connection.query('SELECT * FROM products', function(error, response) {
      if (error) { console.log(error) };
      //New instance of our constructor
      const productTable = new Table({
          //declare the value categories
          head: ['Item ID', 'Product Name', 'Department', 'Price', 'Quantity Available'],
          //set widths to scale
          colWidths: [10, 36, 24, 10, 20]
      });
      //for each row of the loop
      for (i = 0; i < response.length; i++) {
          //push data to table
          productTable.push(
              [response[i].item_id, response[i].product_name, response[i].department_name, response[i].price, response[i].stock_quantity]
          );
      }
      //log the completed table to console
      console.log(productTable.toString());
      makePurchase();
  });
};

function makePurchase() {
  //get item id and quantity desired from user.
  inquirer.prompt([
      {
          name: 'ID',
          type: 'input',
          message: 'What is the item number of the product you wish to purchase?'
      }, 
      {
          name: 'Quantity',
          type: 'input',
          message: 'How many would you like to buy?'
      },

  ]).then(function(answers) {
      var quantityDesired = answers.Quantity;
      var idDesired = answers.ID;
      purchaseUpdateDatabase(idDesired, quantityDesired);
  });

}; 

function purchaseUpdateDatabase(ID, quantityNeeded) {
  //check quantity of desired purchase. Minus quantity of the item_id from database if possible. Else inform user 'Insufficient quantity!' 
  connection.query('SELECT * FROM products WHERE item_id = ' + ID, function(error, response) {
      if (error) { console.log(error) };

      //if in stock
      if (quantityNeeded <= response[0].stock_quantity) {
          //calculate cost
          var totalCost = response[0].price * quantityNeeded;
          //inform user
        //   console.log('Thank you for shopping with Bamazon!');
          console.log('Your total cost for ' + quantityNeeded + ' ' + response[0].product_name + ' is ' + totalCost + '.');
          //update database, minus purchased quantity
          connection.query('UPDATE products SET stock_quantity = stock_quantity - ' + quantityNeeded + ' WHERE item_id = ' + ID);
      } else {
          console.log('Insufficient quantity!');
      };
      displayproducts();
  });

};

// displayProducts();
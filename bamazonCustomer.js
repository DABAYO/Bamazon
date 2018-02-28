var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("cli-table");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  displayProducts();
});

// test sql connection
// console.log ("connected as id" + connection.threadid); 


function displayProducts() {
  //show all ids, names, and products from database.
  connection.query('SELECT * FROM products', function(error, response) {
      if (error) { console.log(error) };
      //New instance of our constructor
      var theDisplayTable = new table({
          //declare the value categories
          head: ['Item ID', 'Product Name', 'Category', 'Price', 'Quantity Available'],
          //set widths to scale
          colWidths: [10, 30, 18, 10, 14]
      });
      //for each row of the loop
      for (i = 0; i < response.length; i++) {
          //push data to table
          theDisplayTable.push(
              [response[i].item_id, response[i].product_name, response[i].department_name, response[i].price, response[i].stock_quantity]
          );
      }
      //log the completed table to console
      console.log(theDisplayTable.toString());
      makePurchase();
  });
};

function makePurchase() {
  //get item id and quantity desired from user.
  inquirer.prompt([
      {
          name: "ID",
          type: "input",
          message: "What is the item number of the product you wish to purchase?"
      }, 
      {
          name: 'Quantity',
          type: 'input',
          message: "How many would you like to buy?"
      },

  ]).then(function(answers) {
      var quantityDesired = answers.Quantity;
      var idDesired = answers.ID;
      purchaseFromDatabase(idDesired, quantityDesired);
  });

}; 

function purchaseFromDatabase(ID, quantityNeeded) {
  //check quantity of desired purchase. Minus quantity of the item_id from database if possible. Else inform user "Insufficient quantity!" 
  connection.query('SELECT * FROM products WHERE item_id = ' + ID, function(error, response) {
      if (error) { console.log(error) };

      //if in stock
      if (quantityNeeded <= response[0].stock_quantity) {
          //calculate cost
          var totalCost = response[0].price * quantityNeeded;
          //inform user
          console.log("Thank you for shopping with Bamazon!");
          console.log("Your total cost for " + quantityNeeded + " " + response[0].product_name + " is " + totalCost + ".");
          //update database, minus purchased quantity
          connection.query('UPDATE products SET stock_quantity = stock_quantity - ' + quantityNeeded + ' WHERE item_id = ' + ID);
      } else {
          console.log("Insufficient quantity!");
      };
      displayproducts();
  });

};

// displayProducts();
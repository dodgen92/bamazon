var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");

var connection = mysql.createConnection({
    host:"",
    user:"",
    password:"",
    database:"",
    port:3306
})
connection.connect;


// loads data from products table to terminal console
function display() {
    // Selects all of the data from the MySQL products table
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("Welcome to Bamazon!")
      // Lists table into the console
      console.table(res);
     
      promptCustomerForItem(res);
    });
  };
  
  
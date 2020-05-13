

//load npm package inquirer: 
var inquirer = require('inquirer'); 

//require sql: 
const mysql = require('mysql'); 

require('console.table');

//connect to mysql: 

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306', 
    user: 'root',
    password: '',
    database: 'bamazon'
})

connection.connect(function(err){ 
    if(err) throw err; 
    console.log('connection as id' + connection.threadId); 
    connection.query('SELECT * FROM products', function(err, res) {
        console.log('res', res); 
    allowInquirer(); 
    })
})

var newAmountInStock;
var productName; 

// //prompt users: 1) ask for ID of product, 2) how many units they'd like to buy: 
var allowInquirer = function() { 

    inquirer
        .prompt([
            {
                type: 'list', 
                message: 'Please select the product for purchase', 
                choices: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], 
                name: 'productID' 
            }, 
            {
                type: 'input', 
                message: 'How many?',
                name: 'amount'
            }
        ])
        .then(function(response) {
            
            var productChosen = response.productID;
            var amountChosen = response.amount;
            
            //pull out queries from mysql:
            connection.query('SELECT * FROM products', function(err, res){ 
                productName = res[productChosen -1].product_name; 
                var productAmount = res[productChosen -1].stock_quantity; 
                var productPrice = res[productChosen -1].price;

                newAmountInStock = productAmount - amountChosen; 

                console.log('Product ID: ', productChosen, '| ',  'Product Chosen: ' + productName);
                console.log('Amount Chosen: ', amountChosen,  '| ', 'Amount in Stock: ' + productAmount); 
                
                //check if amount is in stock:
                if (amountChosen > productAmount) { 
                    console.log('Unfortunatly we do not have that much of this product');
                } else { 
                    console.log('Great! We have this amount in our storage')
                    console.log('The product price is: ' + productPrice + ", and your total purchase is: " + productPrice*amountChosen)
                    console.log('There are NOW ' + newAmountInStock + ' of this products in stock.') 
                
                    //update the database: 
                    connection.query(
                        'UPDATE products SET ? WHERE ?',
                        [
                            {
                                stock_quantity: newAmountInStock
                            }, 
                            { 
                                product_name: productName
                            }
                        ],
                        function(err, res) { 
                            if (err) throw err;
                            console.log('Rows Changed in mysql: ' + res.affectedRows);                 
                            //stop the connection to mysql:
                            connection.end();
                        }
                    )
                }
            })
        });
};
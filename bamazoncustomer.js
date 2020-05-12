var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("cli-table2");

var connection = mysql.createConnection({
    host:"",
    user:"",
    password:"",
    database:"",
    port:3000
})
connection.connect;
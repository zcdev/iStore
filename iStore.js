var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "iStore"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Welcome to iStore!");
});

function validate(input) {
  var number = Number.isInteger(input);
  var sign = Math.sign(input);

  if (number && sign === 1) {
    return true;
  } else {
    return "Number cannot be lower or equal to zero.";
  }
}

var item;
var amount;

function purchaseItem() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "id",
        message: "Please enter the ID for the product you would like to purchase:",
        validate: validate,
        filter: Number
      }
    ])
    .then(function(input) {
      item = input.id;
      connection.query("SELECT * FROM products WHERE ?", { id: item }, function(err, data) {
		if (err) throw err;
        if (data.length === 0 || item < data.length) {
		  console.log("Cannot process request. Invalid product ID. Please enter a valid product ID.");
		  console.log("\n---------------------------------------------------------------------\n");
          purchaseItem();
        } else {
          placeOrder();
        }
      });
    });
}

function placeOrder() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many do you need?",
        validate: validate,
        filter: Number
      }
    ])
    .then(function(input) {
      amount = input.quantity;
      connection.query("SELECT * FROM products WHERE ?", { id: item }, function(err, data) {
		if (err) throw err;

		var productData = data[0];
		
        if (data.length !== 0) {
          if (amount <= productData.quantity) {
            console.log("Item found in stock. Your order is being processed...");

            connection.query(
              "UPDATE products SET quantity = " + (productData.quantity - amount) + " WHERE id = " + item, function(err) {
                if (err) throw err;

				console.log("Your order has been placed. Your total is $" + (productData.price * amount).toFixed(2) + "!");
                console.log("Thank you for shopping with iStore!");
                console.log("\n---------------------------------------------------------------------\n");

                connection.end();
              }
            );
          } else {
            console.log("We are sorry, there is not enough product in stock, your order cannot be processed.");
            console.log("Please modify your order.");
			console.log("\n---------------------------------------------------------------------\n");
			purchaseItem();
          }
        }
      });
    });
}

function showInventory() {
  connection.query("SELECT * FROM products", function(err, data) {
    if (err) throw err;

    console.log("Current Inventory: ");

    var display = "";
    for (var i = 0; i < data.length; i++) {
      display = "";
      display += "ID: " + data[i].id + "  |  ";
      display += "Name: " + data[i].name + "  |  ";
      display += "Category: " + data[i].category + "  |  ";
      display += "Price: $" + (data[i].price).toFixed(2) + "\n";

      console.log(display);
    }

    console.log("---------------------------------------------------------------------\n");

    purchaseItem();
  });
}

showInventory();
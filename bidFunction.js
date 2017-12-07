var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost", port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "GreatBayDB"
});

var bid = function (item, amount) {
    console.log(item, amount);
        connection
            .connect(function (err) {
                if (err) 
                    throw err;
                var query = connection.query("SELECT highBid FROM items WHERE ?", [
                    {
                        title: item.toString()
                    }
                ], function (err, res) {
                    console.log(res);
                    if (res[0].highBid < amount) {
                        var query = connection.query("UPDATE products SET ? WHERE ?", [
                            {
                                higheBid: amount
                            }, {
                                item: item
                            }
                        ], function (err, res) {
                            console.log('You are now the highest bidder')
                        });
                    } else {
                        console.log('You are not the highest bidder');
                    }
                });
                connection.end();
            });
    }

    var post = function (item, startBid) {
            connection
                .connect(function (err) {
                    if (err) 
                        throw err;
                    var query = connection.query("INSERT INTO items SET ?", [
                        {
                            title: item
                        }, {
                            highBid: startBid
                        }
                    ], function (err, res) {
                        console.log(err);
                        connection.end();
                    });
                });
        }

        module.exports.post = post;
        module.exports.bid = bid;


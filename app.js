// Load the NPM Package inquirer
var inquirer = require("inquirer");
var mysql = require("mysql");
var bidApp = require('./bidFunction.js');

//Connect to the DB greatBayDB
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "greatBayDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    init();
});

// Select existing Items in the DB to present to the user to choose item to bid on
function init() {
    // Create a "Prompt" with a series of questions.
    // console.log("-----------------------Bidder App-----------------------");
    // console.log("");
    // console.log("");
    // console.log("");

    inquirer
        .prompt([{
            type: "list",
            message: "Would you like to Post or Bid an Item",
            choices: ["Post", "Bid"],
            name: "choice"
        }])
        .then(function (inquirerResponse) { // when POST or BID prompt promise executes

            switch (inquirerResponse.choice) {

                case ("Post"):
                    console.log("postItemFunc");
                    inquirer
                        .prompt([{
                                type: "input",
                                message: "What is this Auction Item's Title",
                                name: "title"
                            },
                            {
                                type: "input",
                                message: "What is this Item's starting Bid",
                                name: "bidAmount"
                            }

                        ])
                        .then(function (inquirerResponse) { // when promise executes
                            console.log("Call postItemFunc" + inquirerResponse.title + inquirerResponse.bidAmount);

                            bidApp.bid(inquirerResponse.title, inquirerResponse.bidAmount);
                        });
                    break; //end case Post

                case ("Bid"):
                    console.log("Selecting all products...\n");
                    connection.query("SELECT * FROM items", function (err, res) {
                        if (err) throw err;
                        // Log all results of the SELECT statement
                        // console.log(res);
                        //connection.end();
                        //Prompt to get more Info
                        inquirer
                            .prompt([{
                                    type: "input",
                                    message: "What is the starting Bid Amount?",
                                    name: "startBid"
                                },
                                {
                                    name: "choice",
                                    type: "rawlist",
                                    choices: function () {
                                        var choiceArray = [];
                                        for (var i = 0; i < res.length; i++) {
                                            choiceArray.push(res[i].title);
                                        }
                                        return choiceArray;
                                    },
                                    message: "What auction would you like to place a bid in?"
                                },
                            ])
                            .then(function (inquirerResponse) { // when promise executes
                                // console.log("Call bidItemFunc" + inquirerResponse.Amount);
                                var chosenItem;
                                for (var i = 0; i < res.length; i++) {
                                    if (res[i].item === inquirerResponse.choice) {
                                        chosenItem = res[i];
                                    }
                                }
                                console.log("chosenItem is " + chosenItem + "Startbid is " + inquirerResponse.startBid)
                                bidApp.post(chosenItem, StartBid);
                            });
                        console.log("");
                        console.log("");
                        console.log("");

                    });
                    break; //end case Bid
            }
        }); //end Post Bid Promise


} // end init


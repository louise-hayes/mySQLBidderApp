# mySQLBidderApp


The basic application  
Using mySQL and inquirer npms in node.js

Upon loading up the program, the user is prompted on whether they would like to "POST AN ITEM" or "BID ON AN ITEM"

   * If the user selects "POST AN ITEM" 
   they are prompted for an assortment of information regarding the item and then that information is added to the database 
   so that others can bid on it

   * If the user selects "BID ON AN ITEM" 
   they are shown a list of all available items and then are prompted to select what they would like to bid on. 
   The console then asks them how much they would like to bid, 
   and their bid is compared to the previous highest bid. 
   If their bid is higher, inform the user of their success and replace the previous bid with the new one. 
   If their bid is lower (or equal), inform the user of their failure and boot them back to the selection screen.

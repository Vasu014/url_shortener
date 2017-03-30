var config = {};

config.db = {};


//The url shortening host
//Shortened URL's will be this url + base58 ID
config.webhost = 'http://localhost:3000/';

//Your MongoDB host and database name

config.db.host = 'localhost:27017';
config.db.name = 'url-shortener';

module.exports = config;
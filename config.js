var config = {};

config.db = {};


//The url shortening host
//Shortened URL's will be this url + base58 ID
config.webhost = 'https://simple-url-short.herokuapp.com//';

//Your MongoDB host and database name

config.db.host = 'mongodb://heroku_shc88p5k:sl9puhtl3sb4qd0mve17o8bvoj@ds145790.mlab.com:45790/heroku_shc88p5k';
config.db.name = 'url-shortener';

module.exports = config;
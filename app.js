//require and instantiate express
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var base58 = require('./base58');


//create a database connection with our MongoDB database
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://' + config.db.host + '/' + config.db.name);
//grab the url model
var Url = require('./models/url');

//handles JSON bodies
app.use(bodyParser.json());

//handles URL encoded bodies
app.use(bodyParser.urlencoded({ extended : true}));


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	//route to serve up the homepage for our url-shortener(index.html)
	res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/api/shorten', function(req, res){
	//route to create and return a shortened url
	var longUrl = req.body.url;
	var shortUrl = '';

	Url.findOne({long_url:longUrl}, function(err,doc){
		if(doc){
			//entry for this url already exists
			shortUrl = config.webhost + base58.encode(doc._id);

			res.send({'shortUrl': shortUrl});
		}else{
			//Need to create new entry for this url
			var newUrl = Url({
				long_url: longUrl
			});

			newUrl.save(function(err){
				if(err){
					console.log(err);
				}
			})

			shortUrl = config.host + base58.encode(newUrl._id);
			res.send({'shortUrl': shortUrl});
		}
	});
});


app.get('/:encoded_id', function(req, res){
	//route to redirect the visitor to original url given a shortened url
	var base58Id = req.params.encoded_id;
	var id = base58.decode(base58Id);

	Url.findOne({'_id':id},function(error, doc){
		if(doc){
			//redirect the user to long url
			res.redirect(doc.long_url);
		}else{
			//No entry in database, redirect user to service homepage
			res.redirect(config.webhost);
		}
	});

});

var port = process.env.PORT || 3000;

var server = app.listen(port, function(){
	console.log('Server listening on port ' + port);
}); 
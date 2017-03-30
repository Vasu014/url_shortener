var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var CounterSchema = Schema({
	_id: {type: String, required: true},
	seq: {type: Number, default: 0}
});

var counter = mongoose.model('counter', CounterSchema);

var urlSchema = Schema({
	_id: {type: Number, index: true},
	long_url: String,
	created_at: Date
});

urlSchema.pre('save', function(next){
	
	var doc = this;
	counter.findByIdAndUpdate({_id:'url_count'},{$inc: {seq:1}},{upsert:true,new:true}, function(error,counter){
		if(error){
			next(error);
		}
		if(counter != null){
			console.log('url_count: ' + counter.seq
			);
			doc._id = counter.seq;
			doc.created_at = new Date();	
		}else{
			console.log('Counter is null bloody');
		}

		
		next();

	});
});

var Url = mongoose.model('Url',urlSchema);

module.exports = Url;
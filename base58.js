var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";

var base = alphabet.length;

function encode(num){
	var encoded = '';

	while(num){
		var rem = num % base;
		var num = Math.floor(num / base);

		encoded = alphabet[rem].toString() + encoded;
	}
  console.log(encoded);
  return encoded;
}

// utility function to convert a base 58 string to base 10 integer
function decode(str){
  var decoded = 0;
  while (str){
    var index = alphabet.indexOf(str[0]);
    var power = str.length - 1;
    decoded += index * (Math.pow(base, power));
    str = str.substring(1);
  }
  return decoded;
}

module.exports.encode = encode;
module.exports.decode = decode;


var  challenges = require("./challenges.js")

var encoded = challenges[4].encode("This is a full, test of the base 8 DeCoder.... woo!")
console.log(encoded)
var decoded = challenges[4].decode(encoded)
console.log(decoded)

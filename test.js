var  challenges = require("./challenges.js")

var encoded = challenges[4].encode("aaabbbaaa")
console.log(encoded)
var decoded = challenges[4].decode(encoded)
console.log(decoded)

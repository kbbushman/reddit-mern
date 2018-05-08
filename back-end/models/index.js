var mongoose = require("mongoose");

// Map Global Promise to Resolve Mongo Promise Warning
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/front_end", {
	useMongoClient: true
})
  .then(() => console.log('Mongodb connected...'))
  .catch(err => console.log(err));

module.exports.TextPost = require("./textPost");
module.exports.Comment = require("./comment");

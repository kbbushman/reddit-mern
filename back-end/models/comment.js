var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var CommentSchema = new Schema()
CommentSchema.add({
	content: String,
	votes: Number,
	comments: [CommentSchema]
});


// var CommentSchema = new Schema({
// 	content: String,
// 	votes: Number,
// 	replies: [this] // This references self (CommentSchema)
// });

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;

var models = require('../models');
var TextPost = models.TextPost;

function index(req, res) {
  TextPost.find({}, function(err, textPosts) {
    if (err) res.send(err);
    else res.json(textPosts);
  });
}

function show(req, res) {
  TextPost.findById(req.params.post_id, function(err, post) {
    if (err) res.send(err);
    else res.json(post);
  });
}

function create(req, res) {
  TextPost.create(req.body, function(err, post) {
    if (err) res.send(err);
    else res.json(post);
  })
}

function update(req, res) {
  TextPost.findByIdAndUpdate(req.params.post_id,
  {$set: req.body}, function(err, post) {
    if (err) res.send(err);
    else res.json(post);
  })
}

function destroy(req, res) {
  TextPost.findByIdAndRemove(req.params.post_id, function(err, post) {
    if (err) res.send(err);
    else res.send('Success: Post Deleted')
  })
}

module.exports.index = index;
module.exports.create = create;
module.exports.show = show;
module.exports.update = update;
module.exports.destroy = destroy;

var models = require('../models');
var Comment = models.Comment;
var TextPost = models.TextPost;

function index(req, res) {
  TextPost.findById(req.params.post_id, function(err, post) {
    if (err) res.send(err);
    else {
      var comments = post.comments;
      res.json(comments);
    }
  });
}

function show(req, res) {
  Comment.findById(req.params.comment_id, function(err, comment) {
    if (err) res.send(err)
    else res.json(comment)
  });
}

function create(req, res) {
  Comment.create(req.body, function(err, comment) {
    if (err) res.send(err);
    else {
      TextPost.findById(req.params.post_id, function(err, post) {
        if (err) res.send(err);
        else {
          post.comments.push(comment);
          post.save();
          res.json(comment);
        }
      })
    }
  })
}

function update(req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id,
    {$set: req.body}, function(err, updatedComment) {
      if (err) res.send(err);
      else {
        TextPost.findById(req.params.post_id, function(err, post) {
          if (err) res.send(err);
          var commentToUpdate = post.comments.id(req.params.comment_id);
          commentToUpdate.content = updatedComment.content;
          commentToUpdate.votes = updatedComment.votes;

          post.save();
          res.json(updatedComment);
        })
      }
    })
}

// UPDATE Version 2
// function update(req, res) {
//   TextPost.findById(req.params.post_id, function(err, post) {
//     var commentToUpdate = post.comments.id(req.params.comment_id);

//     if (commentToUpdate) {
//       commentToUpdate.content = req.body.content;
//       commentToUpdate.votes = req.body.votes;

//       post.save(function(err, savedPost) {
//         console.log('UPDATED', commentToUpdate, 'IN ', savedPost.comments);
//         res.json(commentToUpdate);
//       });
//     } else {
//       res.send(404);
//     }
//   });
// }


function destroy(req, res) {
  Comment.findByIdAndRemove(req.params.comment_id, function(err, comment) {
    if (err) res.send(err);
    else {
      // Remove comment from Post too!
      TextPost.findByIdAndUpdate(req.params.post_id,
      {$pull: {comments: {_id: req.params.comment_id}}}, function(err) {
        if (err) res.send(err);
        else res.send('Success: Comment Deleted')
      })
    }
  })
}

// DELETE Version 2
// function destroy(req, res) {
//   TextPost.findById(req.params.post_id, function(err, post) {
//     console.log(post);
//     // Found the post, now find the comment
//     var commentToDelete = post.comments.id(req.params.comment_id);
//     if (commentToDelete) {
//       commentToDelete.remove();
//       // resave the album now that the song is gone
//       post.save(function(err, saved) {
//         console.log('REMOVED ', commentToDelete._id, 'FROM ', post.comments);
//         res.json(commentToDelete);
//       });
//     } else {
//       res.send(404);
//     }
//   });
// }

module.exports.index= index;
module.exports.show = show;
module.exports.create = create;
module.exports.update = update;
module.exports.destroy = destroy;

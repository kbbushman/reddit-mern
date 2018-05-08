var models = require('../models');
var Comment = models.Comment;
var TextPost = models.TextPost;

function show(req, res) {
  Comment.findById(req.params.comment_id, function(err, comment) {
    if (err) res.send(err)
    else {
      // var commentComment = comment.comments.id(req.params.commentComments_id);
      res.json(comment.comments)
    }
  });
}

function create(req, res) {
  Comment.create(req.body, function(err, commentComment) {
    if (err) res.send(err);

    else {
      Comment.findById(req.params.comment_id, function(err, comment) {
        if (err) res.send(err);
        
        else {
          comment.comments.push(commentComment);
          comment.save();
          // res.json(comment);

          TextPost.findById(req.params.post_id, function(err, post) {
            if (err) res.send(err);

            // console.log(post.comments.id(req.params.comment_id))

            else {
              var commentToUpdate = post.comments.id(req.params.comment_id);
              commentToUpdate.comments.push(commentComment);
              post.save();
              res.json(commentComment);
            }
            
          })
        }
      })
    }
  })
}

function destroy(req, res) {
  Comment.findById(req.params.commentComment_id, function(err, commentComment) {
    if (err) res.send(err);
    else {
      // commentComment.remove();

      Comment.findById(req.params.comment_id, function(err, comment) {
        commentToUpdate = comment.comments.id(req.params.commentComment_id)
        console.log(commentToUpdate);
      })
    }
    
  })
    
    // else {
    //   var commentCommentToRemove = comment.comments.id(req.params.commentComment_id);
    //   if (commentCommentToRemove) {
    //     commentCommentToRemove.remove();
    //     comment.save()

    //     TextPost.findById(req.params.post_id, function(err, post) {
    //       if (err) res.send(err);
    //       else {
    //         var commentToRemove = post.comments.id(comment._id);
    //         commentToRemove.remove();
    //         post.comments.push(comment);
    //       }
    //     })
    //   }
    // }



    // else {
    //   // Remove comment from Post too!
    //   TextPost.findByIdAndUpdate(req.params.post_id,
    //   {$pull: {comments: {_id: req.params.comment_id}}}, function(err) {
    //     if (err) res.send(err);
    //     else res.send('Success: Comment Deleted')
    //   })
    // }

}

module.exports.show = show;
module.exports.create = create;
module.exports.destroy = destroy;

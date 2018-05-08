var express = require('express');
var router = express.Router();
var textPostsController = require('../controllers/textPosts');
var commentsController = require('../controllers/comments');
var commentCommentsController = require('../controllers/commentComments');

//Post Routes
router.get('/api/posts', textPostsController.index);
router.post('/api/posts', textPostsController.create);
router.get('/api/posts/:post_id', textPostsController.show);
router.put('/api/posts/:post_id', textPostsController.update);
router.delete('/api/posts/:post_id', textPostsController.destroy);

//Comment Routes
router.get('/api/posts/:post_id/comments', commentsController.index);
router.post('/api/posts/:post_id/comments', commentsController.create);
router.get('/api/posts/:post_id/comments/:comment_id', commentsController.show);
router.put('/api/posts/:post_id/comments/:comment_id', commentsController.update);
router.delete('/api/posts/:post_id/comments/:comment_id', commentsController.destroy);
router.get('/api/posts/:post_id/comments/:comment_id/comments', commentCommentsController.show);
router.post('/api/posts/:post_id/comments/:comment_id/comments', commentCommentsController.create);
router.delete('/api/posts/:post_id/comments/:comment_id/comments/:commentComment_id', commentCommentsController.destroy);


module.exports = router;

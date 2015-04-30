Meteor.publish('posts', function() {
	return Posts.find();
});

/*
// we get Tom Coleman post without url
Meteor.publish('posts', function() {
  return Posts.find({'author':'Tom Coleman'},
  	{fields: {url: false}});
});
*/

Meteor.publish('comments', function() {
	check(postId, String);
	return Comments.find({
		postId: postId
	});
});
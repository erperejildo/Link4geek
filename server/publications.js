Meteor.publish('posts', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Posts.find({}, options);
});

/*
// we get Tom Coleman post without url
Meteor.publish('posts', function() {
  return Posts.find({'author':'Tom Coleman'},
  	{fields: {url: false}});
});
*/

Meteor.publish('comments', function(postId) {
	check(postId, String);
	return Comments.find({
		postId: postId
	});
});

Meteor.publish('notifications', function() {
	return Notifications.find({
		userId: this.userId,
		read: false
	});
});
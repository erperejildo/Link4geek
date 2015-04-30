Comments = new Mongo.Collection('comments');

Meteor.methods({
	commentInsert: function(commentAttributes) {
		check(this.userId, String);
		check(commentAttributes, {
			postId: String,
			body: String
		});
		var user = Meteor.user();
		var post = Posts.findOne(commentAttributes.postId);
		if (!post)
			throw new Meteor.Error('Comentario inválido', 'Debes comentar en un post');
		comment = _.extend(commentAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});
		return Comments.insert(comment);
	}
});
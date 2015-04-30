Posts = new Mongo.Collection('posts');

Posts.allow({
	update: function(userId, post) {
		return ownsDocument(userId, post);
	},
	remove: function(userId, post) {
		return ownsDocument(userId, post);
	},
});

Posts.deny({
	update: function(userId, post, fieldNames) {
		// may only edit the following two fields:
		return (_.without(fieldNames, 'url', 'title').length > 0);
	}
});

Posts.deny({
	update: function(userId, post, fieldNames, modifier) {
		var errors = validatePost(modifier.$set);
		return errors.title || errors.url;
	}
});

Meteor.methods({
postInsert: function(postAttributes) {

	check(Meteor.userId(), String);
	check(postAttributes, {
		title: String,
		url: String
	});

	var errors = validatePost(postAttributes);
	if (errors.title || errors.url) {
		throw new Meteor.Error('invalid-post', "Necesitas URL y título para tu post");
	}

	// if we have some post with the same url
	var postWithSameLink = Posts.findOne({
		url: postAttributes.url
	});
	if (postWithSameLink) {
		return {
			postExists: true,
			_id: postWithSameLink._id
		}
	}

	var user = Meteor.user();
	var post = _.extend(postAttributes, {
		userId: user._id,
		author: user.username,
		submitted: new Date(),
		commentsCount: 0,
		upvoters: [],
		votes: 0
	});

	var postId = Posts.insert(post);
	return {
		_id: postId
	};
},

upvote: function(postId) {
	check(this.userId, String);
	check(postId, String);
	var affected = Posts.update({
		_id: postId,
		upvoters: {
			$ne: this.userId
		}
	}, {
		$addToSet: {
			upvoters: this.userId
		},
		$inc: {
			votes: 1
		}
	});
	if (!affected)
		throw new Meteor.Error('invalid', "No estás habilitado a votas este post");
}
});

});

validatePost = function(post) {
	var errors = {};
	if (!post.title)
		errors.title = "Necesitas un título para continuar";
	if (!post.url)
		errors.url = "Necesitamos la url :(";
	return errors;
}
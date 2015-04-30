Errors = new Mongo.Collection(null);

throwError = function(msg) {
	Errors.insert({message: msg});
};
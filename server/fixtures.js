if (Posts.find().count() === 0) {
  Posts.insert({
    title: 'Introducción a Telescope',
    url: 'http://sachagreif.com/introducing-telescope/'
  });

  Posts.insert({
    title: 'Meteor (framework utilizado)',
    url: 'http://meteor.com'
  });

  Posts.insert({
    title: 'Libro de Meteor',
    url: 'http://themeteorbook.com'
  });
}
var postsData = [
  {
    title: 'Introducción a Telescope',
    url: 'http://sachagreif.com/introducing-telescope/'
  },
  {
    title: 'Meteor (framework utilizado)',
    url: 'http://meteor.com'
  },
  {
    title: 'Libro de Meteor',
    url: 'http://themeteorbook.com'
  }
];
Template.postsList.helpers({
  posts: postsData
});
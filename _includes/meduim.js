//  request node module 
var request = require('request');
var userName = 'ryzhov';
var returnObj;
var options = {
  method: 'GET',
  url: 'https://medium.com/@' + userName + '/latest',
  headers: {
    accept: 'application/json'
  }
};

// parsing the post data from the body of the response
request(options, function(error, response, body) {
  if (error) throw new Error(error);
  body = JSON.parse(body);
  returnObj = body.payload.references.Post;
});

// create an array of post objects containing the title, date, link and image
var posts = [];
  for (var post in returnObj) {
    posts.push(post);
  }
var monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var postInfo = [];
posts.forEach(function(post){
  var thisPost  = returnObj[post];
  var postTitle = thisPost.title;
  var postDate = new Date(thisPost.createdAt);
  var month = postDate.getMonth();
  month = monthNames[month];
  var day = postDate.getDate();
  var year = postDate.getFullYear();
  postDate = month + ' ' + day + ', ' + year;
  var postLink  = thisPost.uniqueSlug;
  var postImg   = thisPost.virtuals.previewImage.imageId;
  var postObj = {
    title: postTitle,
    date : postDate,
    link : postLink,
    img  : postImg
  };
  postInfo.push(postObj);
});

// pass the array to a function that generates the html
var output = function(postInfo){
    var html = '';
    postInfo.forEach(function(post){
      html += '<img src="' + post.img +'">';
      html += '<h2>' + post.title + '</h2>';
      html += '<p>' + post.date + '</p>';
      html += '<a href="' + post.link + '">Read More</a>';
    });
    return html;
};

// output the html to a file in your includes folder.
fs.writeFile(‘./_includes/blog_post-medium.html’, output, function(err){
  if (err) {
    return console.error(err);
  }
  console.log(‘All posts written to _includes/blog_post_medium.html’);
});
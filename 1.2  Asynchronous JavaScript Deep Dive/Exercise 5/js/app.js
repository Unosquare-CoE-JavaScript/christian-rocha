//Create a function that will retrieve the posts from the jsonplaceholder site (https://jsonplaceholder.typicode.com/posts). Set up the function so you can pass in the userID and the function will assign only the posts for that user to a variable. The data should be stored in an array.
"use strict";

var API_URL = 'https://jsonplaceholder.typicode.com/posts';
var userId1, userId2, userId3;


async function retrievePosts(userID) {
  if (isNaN(userID)) {
    return console.log('the userID must be numeric');
  }
  let posts = await fetch(API_URL).then(res => res.json());
  return posts.filter(post => post.userId === userID);
}


retrievePosts(1).then(response => userId1 = response);
retrievePosts(2).then(response => userId2 = response);
retrievePosts(3).then(response => userId3 = response);

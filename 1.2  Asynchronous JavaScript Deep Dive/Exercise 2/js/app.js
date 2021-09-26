var MAINAPP = (function(nsp) {
    "use strict";
    var API_URL = 'https://jsonplaceholder.typicode.com/';

    //Fetch for posts
    fetch(API_URL+'posts')
    .then(res => {
        return res.json();
    })
    .then(posts => {
        nsp.posts = posts;
    })
    .catch(err => {
        nsp.posts = [];
    })

    //Fetch for comments
    fetch(API_URL+'comments')
    .then(res => {
        return res.json();
    })
    .then(comments => {
        nsp.comments = comments;
    })
    .catch(err => {
        nsp.comments = [];
    })

    //Fetch for todos
    fetch(API_URL+'todos')
    .then(res => {
        return res.json();
    })
    .then(todos => {
        nsp.todos = todos;
    })
    .catch(err => {
        nsp.todos = [];
    })

    //public      
    return nsp;


})(MAINAPP || {});
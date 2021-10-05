var MAINAPP = (function(nsp) {
    "use strict";
    var API_URL = 'https://jsonplaceholder.typicode.com/';

    let postPromise =  fetch(API_URL+'posts')
        .then(res => {
            return res.json();
        });

    let commentsPromise = fetch(API_URL+'comments')
        .then(res => {
            return res.json();
        });

    let todosPromise =  fetch(API_URL+'todos')
        .then(res => {
            return res.json();
        });

    Promise.all([postPromise, commentsPromise, todosPromise])
    .then(response => {
        nsp.posts = response[0];
        nsp.comments = response[1];
        nsp.todos = response[2];
    })
    .catch(err => {
        console.log('There was an error in: '+err);
    })

    //public      
    return nsp;


})(MAINAPP || {});
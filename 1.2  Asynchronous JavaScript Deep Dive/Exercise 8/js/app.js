var MAINAPP = (function(nsp) {
    "use strict";

    let url = 'https://jsonplaceholder.typicode.com/';

    /*
    Change this code to use async await. Make sure to use promise.all so that we await all three pieces of data without awaiting each individually which would take much longer.

    Which pattern do you prefer for this application? promises or async await?
    */
   (async function () {
        try {
            let postsPromise = fetch(url + 'posts/').then(res => res.json());
            let commentsPromise = fetch(url + 'comments/').then(res => res.json());
            let todosPromise = fetch(url + 'todos/').then(res => res.json());

            let result = await Promise.all([postsPromise, commentsPromise, todosPromise])
            nsp.posts = result[0];
            nsp.comments = result[1];
            nsp.todos = result[2];

        } catch (err) {
            console.log(`Problem retrieving data: ${err}`)
        }
   })();
    
    console.log("Remaining Code.")

    //public
    return nsp;

})(MAINAPP || {});


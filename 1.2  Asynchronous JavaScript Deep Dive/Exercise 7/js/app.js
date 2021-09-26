var MAINAPP = (async function(nsp) {
    "use strict";

    let url = 'https://jsonplaceholder.typicode.com/';

    /*
    The following promise code is inside a module pattern. Change the promise code so that it uses async await instead. You will want to use an IIFE for this. Make sure to catch any errors.
    */
   try {
        let response = await fetch(url + 'posts/')
            .then(response1 => response1.json())

        nsp.posts = response;
   } catch(err) {
    console.log(`Problem retrieving posts: ${err}`);
       
   }
    

    //public
    return nsp;
})(MAINAPP || {});



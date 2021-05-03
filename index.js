// config to setup app all apps start like this for now////
const http = require('http');

const hostname = '127.0.0.1';
const port = 3001;

const express = require('express');
const app = express();

////// Tells express to use template engine module from npm
const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const server = http.createServer(app);

const db = require('./db');

app.get('/', (req, res) => {
    // console.log(req.url);
    // res.send("My Address Book");
    res.render('home');
});


app.get('/friends', (req, res) => {
    console.log("request path is: " + req.path);
    let htmlString = ``;
    htmlString += `<ul>`;

    for (let friend of db) {
        console.log(friend);
        htmlString += `<li>
                        <a href="friends/${friend.name}">${friend.name}</a>
                       </li>`
    }

    htmlString += `</ul>`;
    console.log(htmlString)

    // res.send("This is the friends list")
    res.send(htmlString);

});

app.get('/friends/:name', (req, res) => {
    console.log(req.params);
    let { name } = req.params;

    let friend = db.find(thisFriend => thisFriend.name === name);
    if (friend) {
        console.log(friend);


        let htmlData = ``;
        htmlData += `<h1>${friend.name}</h1>`;
        htmlData += `<h1>${friend.skill}</h1>`;
        htmlData += `<h1>${friend.handle}</h1>`;

        res.send(htmlData);

        // res.send("my friend here Lets go");
    } else {
        res.status(404)
            .send("No friend with the name found errror");
    }

});


server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`)
});

// /////////////////////Donald Index.js Code/////////////

// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3001;

// const express = require('express');
// const app = express();

// const server = http.createServer(app);

// const db = require('./db');

// app.get('/', (req, res) => {
//     console.log(req.url);
//     res.send("My Address Book");
// });

// app.get('/friends', (req, res) => {
//     console.log("request path is: "+ req.path);
//     let htmlString = ``;
//     htmlString += `<ul>`;
//     for (let friend of db) {
//         console.log(friend);
//         htmlString += `<li>
//                             <a href="${req.path}/${friend.name}">${friend.name}</a>
//                         </li>`
//     }

//     htmlString += `</ul>`;
//     console.log(htmlString);

//     res.send(htmlString);
// });

// app.get('/friends/:name', (req, res) => {
//     console.log(req.params.name);
//     var {name} = req.params;

//     var friend = db.find(thisFriend => thisFriend.name === name);
//     if (friend) {
//         console.log(friend);

//         let htmlData =``;
//         htmlData += `<h1>${friend.name}</h1>`;
//         htmlData += `<h1>${friend.skill}</h1>`;
//         htmlData += `<h1>${friend.handle}</h1>`;

//         res.send(htmlData);
//     } else {
//         res.status(404)
//             .send("No friend with that name found");
//     }
// });

// server.listen(port, hostname, () => {
//     console.log(`Server is running at http://${hostname}:${port}`)
// });

// /////////////////////Donald Package.json Code/////////////
// {
//   "name": "practice-express",
//   "version": "1.0.0",
//   "description": "",
//   "main": "index.js",
//   "scripts": {
//     "dev": "nodemon index.js",
//     "test": "echo \"Error: no test specified\" && exit 1"
//   },
//   "keywords": [],
//   "author": "",
//   "license": "ISC",
//   "dependencies": {
//     "express": "^4.17.1",
//     "express-es6-template-engine": "^2.2.3"
//   },
//   "devDependencies": {
//     "nodemon": "^2.0.7"
//   }
// }


/*
Passing an object to res.send automatically uses the
JSON as content-type. On the other hand, passing a string,
automatically uses text/html for content-type.
*/

/*
the .use() function is used to register middleware,
  it takes exactly one function as an argument.
*/

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `A ${req.method} occurred at ${req.url} on ${now}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log(err);
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/data/moredata', (req, res) => {
  res.send({
    prop1: 'this is data',
    prop2: 232
  });
});

//.get takes two arguments
//the first is a route
//the second is a function that determines what to do
  //the second argument, the function, also takes two arguments
    //request
    //response
app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!!!!</h1>'); //default content-type = html
  // res.send({
  //   likes: [
  //     'biking',
  //     'hiking',
  //     'reading',
  //     'exercising',
  //     'programming',
  //   ]
  // });
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    currentYear: new Date().getFullYear(),
    welcomeMessage: 'Welcome to my website!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear(),
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request',
  });
});

app.get('/test', (req,res) => {
  res.render('test.hbs', {
    pageTitle: 'Test page',
    data: ['beer', 'cola', 'diet cola', 'wine'],
    currentYear: new Date().getFullYear()
  })
});


app.listen(port, () => {
  console.log('Server is up on port', port);
});

 const express = require('express');
 const hbs = require('hbs');
 const fs = require('fs');
 const port = process.env.PORT || 3000;




 var app = express();

 // this defins the directory of our parials , which allows us to render whenever we want in our hbs pages by 
 //calling {{name of partial}} in our hbs files ( ex. footer or header)
 hbs.registerPartials(__dirname + '/views/partials');



 // this function registers a function at the hbs so we can use it in our hbs files. 
 // in this case its the getCurrentYear function ehich we can render using {{getCUrrentYear}} 
 //anywhere in hbs files. 
 hbs.registerHelper('getCurrentYear', () => {
     return new Date().getFullYear();
 });




 // uppercase any text in the hbs files by mentioning the helper name infront of the variable like {{screamIt welcomeMessage}}
 hbs.registerHelper('screamIt', (text) => {
     return text.toUpperCase();
 });






 app.use((req, res, next) => { // this is a middlewhear which can be used for logging or database requests or user authentication 

     var now = new Date().toString();
     var log = `${now} ${req.method} ${req.url}`;
     fs.appendFile('server.log', log + '\n', (err) => {
         if (err) {
             console.log(err);
         }
     });
     next(); // if we dont call next the app will never move to process the requested url ! 
 })

 //============= Maintenance ================

 //  app.use((req, res, next) => {

 //      res.render('maintenance.hbs');

 //  });

 //============= Maintenance ================


 // defins any static directory we want to reach within our project
 //this is registering a middlewear to express ( teaching express a new thing ! )
 app.use(express.static(__dirname + '/public'));

 // defining hbs as the view engin we use in our application 
 app.set('view engin', 'hbs');
 // home directory rendering the page home which is defined in the views file and hbs reads it 
 app.get('/', (req, res) => {

     res.render('home.hbs', {
         pageTitle: 'Home Page',
         welcomeMessage: 'Hello there , welcome to our brand new website' // this can be called in home.hbs page -->
     })

 });
 // about page  directory rendering the page about which is defined in the views file and hbs reads it 
 app.get('/about', (req, res) => {
     res.render('about.hbs', {
         pageTitle: 'About Page'
     });

 });

 // statically send the json object error with some details 
 app.get('/bad', (req, res) => {

         var errorMessage = 'error !';
         res.send({
             type: 'error',
             message: errorMessage,
             time: `the time is : 11 pm`
         })

     })
     // listen to port 3000 and print the message below :
 app.listen(port, () => {
     console.log(`server is running using port number ${port}`)
 });
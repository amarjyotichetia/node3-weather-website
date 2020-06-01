const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


/**
 * Express application
 */

const app = express()

//for heroku config for deploy
const port = process.env.PORT || 3000

 /*
 //homepage basic part
 //incomming request/response req/res
 app.get('', (req, res) => {
    res.send('Hello express')
 })

 //http://127.0.0.1:3000/help
 app.get('/help', (req, res) => {
    res.send('You are in help page') 
 })

 //http://127.0.0.1:3000/about
 app.get('/about', (req, res) => {
    res.send('You are in about page') 
 })

 //http://127.0.0.1:3000/weather
 app.get('/weather', (req, res) => {
    res.send('You are in weather page') 
 })

 //start server
 //http://127.0.0.1:3000/
 app.listen(3000, () => {
     console.log('Server stated...')
 })

 */

 /*
 //Render Html content
 app.get('', (req, res) => {
    res.send('<h1> Weather </h1>')
 })

 //sending json respoonse to view
 app.get('/help', (req, res) => {
    res.send({
        name: "Amar",
        age: 30
    }) 
 })
*/

//render html pages from public folder without any functions
//by using this we get public folder content like css, js etc
//http://127.0.0.1:3000/about.html
const publicDirectoryPath = path.join(__dirname, '../public')

//if we change views folder as templates folder name
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setting hbs for view engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


//for handelbar engine, rendering dynamic view
app.get('', (req, res) => {
   //first argument is view file name
   //second parameter is the object of values to render in view
   res.render('index',{
      title: "Weather App",
      name: "Amar"
   })
})

app.get('/about', (req, res) => {
   //first argument is view file name
   //second parameter is the object of values to render in view
   res.render('about',{
      title: "About us",
      name: "Amar"
   })
})

app.get('/help', (req, res) => {
   //first argument is view file name
   //second parameter is the object of values to render in view
   res.render('help',{
      title: "FAQ",      
      name: "Amar"
   })
})



/**
 * creatiing API
 * http://127.0.0.1:3001/weather?address=Bangalore
 * response is always json data of weather report
 */
app.get('/weather', (req, res) => {

   //getting URL parameter. if empty, return error msg
   if (!req.query.address) {
       return res.send({
           error: 'You must provide an address!'
       })
   }

   //calling geocode from utils folder
   //also in response, using object destructuring({latitude, longitude, location})
   //default parameter also used in object destructuring
   geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
      if(error) {
         return res.send({ error })       
      }

      //now call forecast based on geocode
      forecast(latitude, longitude, (error, forecastData) => {
         if(error) {
            return res.send({ error })       
         }

         //actual forecast data
         res.send({ 
            forecast: forecastData,
            location: location,
            address: req.query.address
         })

      }) //end of forecast finction
     
   }) //end of geocode

})



/** for 404 page not found url. It should be in last route function 
 * express search it one by one '*'
*/
app.get('/help/*', (req, res) => {
   //res.send('help article not found')
   res.render('404',{
      title: "404",      
      name: "Amar",
      errorMessage: "Help article not found",      
   })
})

app.get('*', (req, res) => {
   //res.send('404 page')
   res.render('404',{
      title: "404",      
      name: "Amar",
      errorMessage: "Page not found",
      
   })
})




 //start server
 //http://127.0.0.1:3000/
 app.listen(port, () => {
   console.log('Server stated...'+port)
})

//fetch is a popular browser API calling function
//this js file is calling in index.hbs
/*
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})
*/

//fetch weather data from created API in our application
//http://127.0.0.1:3000/weather?address=Bangalore
/*
fetch('http://127.0.0.1:3000/weather?address=Bangalore').then((response) => {
    response.json().then((data) => {
        if(data.error) {
            console.log(data.error)
        } else {
            console.log(data)
        }        
    })
})
*/

//selecting form
const waetherForm = document.querySelector('form')
//get element of search box value
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

//messageOne.textContent = "From JS"

//event listener for form submit
waetherForm.addEventListener('submit', (e) => {
    //browser will not refresh
    e.preventDefault()

    //search box value
    const location = search.value

    messageOne.textContent = "Loading ..."
    messageOne.textContent  =  ''

    fetch('/weather?address=' +  location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = data.error
        } else {
            //console.log(data)
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast.descriptions + ', Temperature: ' + data.forecast.temperature + ', Feels like: '+ data.forecast.feelslike
        }        
    })
})
    
})
const request = require('postman-request')
const forecast = (latitude,longitude,callback) =>{
const url = 'http://api.weatherstack.com/current?access_key=79928d79cae90bc11346c2a9d1ada0ce&query='+ longitude +',' + latitude + '&units=f'





//request({url: url,json: true},(error,response)=>{
request({url,json: true},(error,response)=>{                            /* Usage of shorthand syntax */
    //console.log(response.body.current)
    if(error){
        callback("Unable to connect.....",undefined)
    }else if(response.body.error){
        callback("Unable to find the location",undefined)
    }   
    else{
        callback(undefined,"It is currently " + response.body.current.temperature + " degrees out. There is a " + response.body.current.precip + "% chance of rain. Weather Description:" + response.body.current.weather_descriptions[0] + "Humidity is " +response.body.current.humidity + 'and the pressure is '+ response.body.current.pressure )
         //callback(undefined,'Unable to connect to location services')
    } 
    
    // const data =JSON.parse(response.body)
    // console.log(data.current)
    // console.log(response)
}) 
}

module.exports = forecast

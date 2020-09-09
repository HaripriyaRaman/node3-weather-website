const request = require('postman-request')
const geocode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaGFyaXByaXlhcmFtYW4iLCJhIjoiY2tlM3VtejNrMGEwYjJ5cGxxMmE3cW1mcyJ9.yKfKIrIKQ7dgMWRr3Jp6Xg&limit=1'
//request({url:url,json:true},(error,response)=>{
    request({url,json:true},(error,response)=>{         /*Usage of shorthand syntax  */
    if(error){
        callback('Unable to connect to location services',undefined)
    }else if(response.body.features.length === 0){
        callback('Unable to find location try again with different search term',undefined)
     }
     else{
         callback(undefined,{
             Latitude: response.body.features[0].center[1],
             Longitude :  response.body.features[0].center[0],
             Location: response.body.features[0].place_name
         })
        // console.log("LAtitude = " + response.body.features[0].center[1]+ " Longitude = " + response.body.features[0].center[0])
    } 
    })
}
module.exports = geocode
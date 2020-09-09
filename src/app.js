const path = require('path')
const express =require('express')
const app =express()
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

console.log(__dirname)  /*Shows the directory path */
//console.log(__filename) /*Shows the path of the entire file */
//console.log(path.join(__dirname,'../public'));

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Set up handle bar engine 
app.set('view engine','hbs') /*Single command which is used to set handlebars.app.set(key,value) */
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

const directoryPath =path.join(__dirname,'../public')

//setup static directory to serve
app.use(express.static(publicDirectoryPath))  /*Shows up initially when the page */

//Index.hbs page
app.get('',(req,res) =>{
    res.render('index.hbs',{
        title:'WEATHER APP',
        name:'Harry'
    }) /*Used to send pages */
})
//about.hbs
app.get('/about',(req,res) =>{
    res.render('about.hbs',{
        name:'Harry',
        title:'ABOUT ME'
    })
})
//help.hbs
app.get('/help',(req,res)=>{
    res.render('help.hbs',{
        title: 'HELP!!',
        message:'How can I help you? This is Lisa here to sort out your queries',
        name:'HArry'
    })
})

// app.get('',(req,res) => {          /*In the first parameter we will be sending /toDirectToAPage */
//     res.send("<h1>Hello Expresssss!!!!</h1>")    /*To print in the web browser *//*Sending HTML  */
// })
// app.get('/help',(req,res)=>{
//     res.send([{
//         name:'Hari',
//         age:22                  /*Sending json with array of objects */
//     },{
//         name: 'Priya',
//         age:21
//     }])
// })
// app.get('/about',(req,res)=>{
//     res.send('<h1>about page</h1>')
// })
app.get('/weather',(req,res)=>{
     if(!req.query.address){
        return res.send({
            error:'Address is required'
        })
    }
    geocode(req.query.address,(error,{Latitude,Longitude,Location}={})=>{
        if(error){
            return res.send({error})
        }
         forecast(Latitude,Longitude,(error,data)=>{
             if(error){
                 return res.send({error})
             }
             res.send({
                 location:Location,
                 forecast:data,
                 address:req.query.address
             })
         })
    })


    
   

    // res.send({
    //     location:'Boston',
    //     forecast :'36 degrees',
    //     address:req.query.address
    // })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You need to provide search item',
        })
    }
    console.log(req.query.search)
    res.send({
        products:[],
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404.hbs',{
        title:'404 PAGE',
        message:'Help articles not found',
        name:"Harry"
    })
})
app.get('/about/*',(req,res)=>{
    res.render('404.hbs',{
        title:'404 PAGE',
        message:'About articles not found',
        name:'Harry'
    })
})

app.get('*',(req,res)=>{    /*If no route match then this executes Always comes after all the existing routes*/
    res.render('404.hbs',{
        title:'404 PAGE',
        name:'Harry',
        message:'Page not found'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})
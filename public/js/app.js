
// fetch('http://localhost:3000/weather?address=!').then((res)=>{
//     res.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }else{
//         console.log(data.location)
//         console.log(data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

// message.textContent = 'JavaScript'
weatherForm.addEventListener('submit',(e)=>{
    
    e.preventDefault()
    const location = search.value
    // fetch('http://localhost:3000/weather?address=' + location).then((res)=>{
    fetch('/weather?address=' + location).then((res)=>{
    res.json().then((data)=>{
        if(data.error){
             message.textContent = data.error
            message2.textContent = ""
            console.log(data.error)
        }else{
            message.textContent = data.forecast 
            message2.textContent =data.location
            // message.textContent = data.location
           
        console.log(data.location)
        console.log(data.forecast)
        }
    })
})
    // console.log(location)  
    // console.log('Working ')
})
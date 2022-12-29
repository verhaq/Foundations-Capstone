const wName=document.querySelector('#wildlife-name') 
const wPic=document.querySelector('#wildlife-picture')
const wNotes=document.querySelector('#wildlife-notes')
const wDate=document.querySelector('#date-time')
const submitForm=document.querySelector('#submitBtn')
let baseURL="http://localhost:5050"

const sendForm =(e)=>{
    evt.preventDefault()

    let userObj= {
        wName:wName.value,
        wPic:wPic.value,
        wNotes:wNotes.value,
        wDate:wDate.value
    }
    console.log(userObj)

    axios.post(`/add`,userObj)
.then(() => {
    alert("Message Sent")
    console.log('Obj sent to DB')
    wName.value=''
    wPic.value=''
    wNotes.value=''
    wDate.value=''
    
})
.catch(err=>console.log(err))
}



submitForm.addEventListener('submit',sendForm)


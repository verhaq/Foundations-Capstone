const wName = document.querySelector('#wildlifeName')
const wPic = document.querySelector('#wildlife-picture')
const wNotes = document.querySelector('#wildlife-notes')
const wDate = document.querySelector('#date-time')
const form = document.querySelector('form')
const entryList = document.querySelector('#entries-container')
const formContainer = document.querySelector('#formContainer')
const displayBtn = document.querySelector('#display')

const sendForm = (e) => {
  console.log('hello')
  e.preventDefault()
  console.log('bye')

  // const fd = new FormData(form);

  // const obj = Object.fromEntries(fd);
  //     console.log(obj);
  let obj = {
    wName: wName.value,
    wPic: wPic.value,
    wNotes: wNotes.value,
    wDate: wDate.value.toString().split('T')[0],
    marker_id: marker_id.innerHTML
  }
  console.log(obj)
  axios
    .put(`${baseURL}/update`, obj)
    .then((res) => {
      alert('Form successfully submitted!')
      console.log(res.data)
    })
    .catch((err) => console.log('error in axios', err))
}
console.log(form)
form.addEventListener('submit', sendForm)

const displayForm = (e) => {
  e.preventDefault()
  axios.get(`${baseURL}/add`).then((res) => {
    formContainer.innerHTML = ''
    let entry = res.data
    console.log(entry)
    const formDiv = document.createElement('div')
    formDiv.innerHTML = `<div>${entry}</div>`
    formContainer.appendChild(formDiv)
    return entry
  })
}

displayBtn.addEventListener('click', displayForm)







    
// function createEntryCard() {
//     const EntryCard = document.createElement('div')
//     EntryCard.classList.add('entry-card')

//     EntryCard.innerHTML = `<h2>${elem.wName}</h2>
//                      <h3>${elem.wPic}</h3>
//                      <h4>${elem.wNotes}</h4>`
//     entryList.appendChild(EntryCard)
    
// }    

// function displayEntry(arr) {
//     entryList.innerHTML = ``
//     for (let i = 0; i <arr.length; i++) {
//         createEntryCard(arr[i])
//     }
// }


// function getEntries() {
//     entryList.innerHTML = ''

//     axios.get(`${baseURL}/add`)
//     .then(res => {
//         res.data.forEach(elem => {
//             let EntryCard = `<div class="entry-card">
//                 <h2>${elem.wName}</h2>
//                 <h3>${elem.wPic}</h3>
//                 <h4>${elem.wNotes}</h4>
//                 </div>
//             `

//             entryList.innerHTML += EntryCard
//         })

//     })

// }



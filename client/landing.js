const randomBtn= document.querySelector('#randomAnimalBtn')
const animalContainer=document.getElementById('animalContainer')
let baseURL="http://localhost:5050"

const displayAnimal= (e) => {
    e.preventDefault()
    axios.get(`${baseURL}/api/animal`)
    .then(res => {
        animalContainer.innerHTML=''
        let animal = res.data
        console.log(animal)
        const animalDiv=document.createElement('div')
        animalDiv.innerHTML=(`<div>${animal}</div>`)
        animalContainer.appendChild(animalDiv)
    })
}

randomBtn.addEventListener('click',displayAnimal)
const randomBtn = document.querySelector('#randomAnimalBtn')
const animalContainer = document.getElementById('animalContainer')
let baseURL = 'http://localhost:5050'

const displayAnimal = (e) => {
  e.preventDefault()
  axios.get(`${baseURL}/api/animal`).then((res) => {
    animalContainer.innerHTML = ''
    let animals = res.data
    console.log(animals.animals)
    animals.animals.forEach((element) => {
      const animalDiv = document.createElement('div')
      animalDiv.className = 'animalDiv'
      animalDiv.innerHTML = `<h1>${element.name}</h1> <img class='animalImg' src=${element.img}/>`
      animalContainer.appendChild(animalDiv)
    })
  })
}

randomBtn.addEventListener('click', displayAnimal)

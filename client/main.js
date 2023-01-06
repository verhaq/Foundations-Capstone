const closeModalButtons = document.querySelectorAll('.close-button')
const overlay = document.getElementById('overlay')
const RemoveMarkerBtn = document.getElementById('remove-last-marker')
const HideMarkerBtn = document.getElementById('hide-all-markers')
const ShowMarkerBtn = document.getElementById('show-all-markers')
const marker_id = document.getElementById('marker_id')
const marker_pos = document.getElementById('marker_pos')

// const wName = document.querySelector('#wildlifeName')
// const wPic = document.querySelector('#wildlife-picture')
// const wNotes = document.querySelector('#wildlife-notes')
// const wDate = document.querySelector('#date-time')

const baseURL = 'http://localhost:5050'
const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
let labelIndex = 0

var loadingText = document.getElementById('loadingText')

function openLoading() {
  if (loadingText == null) return
  loadingText.classList.add('active')
}

async function getAllDbMarkers() {
  const markers = await axios.get(`${baseURL}/get`)
  return markers.data
}
async function initMap() {
  let houston = { lat: 29.7604, lng: -95.3698 }

  var options = {
    zoom: 10,
    center: houston
  }

  var map = new google.maps.Map(document.getElementById('map'), options)

  // new google.maps.Marker({
  //   position: houston,
  //   map: map,
  //   draggable: true,
  //   animation: google.maps.Animation.DROP
  // })
  var markers = []
  openLoading()
  const dbMarker = await getAllDbMarkers()
  markers = dbMarker
  markers.forEach((marker) => {
    var newMarker = new google.maps.Marker({
      position: { lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) },
      map: map,
      animation: google.maps.Animation.DROP,
      label: marker.marker_id.toString()
    })
    newMarker.addListener('click', (e) => {
      const clickedMarker = markers.find((allMarkers) => allMarkers.marker_id.toString() === newMarker.label)
      console.log(clickedMarker)
      marker_id.innerHTML = newMarker.label
      marker_pos.innerHTML = `${marker.lat}, ${marker.lng}`
      wName.value = marker.wildlife_name
      wPic.value = marker.wildlife_picture
      wNotes.value = marker.notes
      wDate.value = marker.date
      openModal()
    })
  })
  loadingText.classList.remove('active')

  var modal = document.getElementById('modal')

function openModal() {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

google.maps.event.addListener(map, 'click', (event) => {
  addMarker(event.latLng, map)
})

async function addMarker(location, map) {
  const dbRes = await axios.post(`${baseURL}/add`, location)
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    animation: google.maps.Animation.DROP,
    label: dbRes.data.marker_id.toString()
  })

  markers.push(marker)

  marker.addListener('click', (e) => {
    marker_id.innerHTML = marker.label
    marker_pos.innerHTML = `${marker.lat}, ${marker.lng}`
    wName.value = ''
    wPic.value = ''
    wNotes.value = ''
    wDate.value = ''
    openModal()
  })
    // function removeLastMarker() {
    //     if (markers.length > 0) {
    //         var lastMarker = markers[markers.length - 1];
    //         lastMarker.setMap(null);
    //         markers.pop()
    //     }
    // }
    // RemoveMarkerBtn.addEventListener('click', removeLastMarker);

    function setMapOnAll(map) {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map)
      }
    }

    function hideMarkers() {
      setMapOnAll(null)
    }

    HideMarkerBtn.addEventListener('click', hideMarkers)

    function showMarkers() {
      setMapOnAll(map)
    }

    ShowMarkerBtn.addEventListener('click', showMarkers)
  }
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}

// closeModalButtons.addEventListener('click', closeModal)

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach((modal) => {
    closeModal(modal)
  })
})



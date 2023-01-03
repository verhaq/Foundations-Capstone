const closeModalButtons = document.querySelectorAll('.close-button')
const overlay =  document.getElementById('overlay')
const RemoveMarkerBtn = document.getElementById('remove-last-marker')
const HideMarkerBtn = document.getElementById('hide-all-markers')
const ShowMarkerBtn = document.getElementById('show-all-markers')
const marker_id = document.getElementById('marker_id')
const baseURL="http://localhost:5050"
const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;





function initMap(){
    let houston = { lat:29.7604 , lng:-95.3698 };
    var options = {
        zoom: 10,
        center: houston
    }
    
    var map = new google.maps.Map(document.getElementById('map'), options);
    
    new google.maps.Marker({
    position: houston,
    map: map, 
    draggable: true,
    animation: google.maps.Animation.DROP
    
    
    
})

var modal = document.getElementById('modal');

function openModal() {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

google.maps.event.addListener(map, "click", (event) => {
    addMarker(event.latLng, map);
    
});

var markers = [];
async function addMarker(location, map) {
   const dbRes = await axios.post(`${baseURL}/add`)
    console.log(dbRes.data.marker_id)
    var marker = new google.maps.Marker({
        position: location, 
        map: map,
        animation: google.maps.Animation.DROP,
        label:  dbRes.data.marker_id.toString(),
    });
    markers.push(marker)

    
    
    
    marker.addListener("click", (e) => {
        console.log(marker)
        marker_id.innerHTML = marker.label
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
          markers[i].setMap(map);
        }
      }

      function hideMarkers() {
        setMapOnAll(null);
      }
    
      HideMarkerBtn.addEventListener("click", hideMarkers);

      function showMarkers() {
        setMapOnAll(map);
      }

      ShowMarkerBtn.addEventListener("click",showMarkers);


};
};





function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active');
    overlay.classList.remove('active');
      }

// closeModalButtons.addEventListener('click', closeModal)

        
        



overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
     closeModal(modal)   
    })
})


/*Created on 04/17/2021 by Frank P and Prabin P
Description: Google maps geocoding api javascript.*/

/*Dependencies: index.html*/

//List of locations from array
var locations =[
    ['location 1','402 Medary Avenue Brookings SD'],['location 2','516 Medary Avenue Brookings SD'],
    ['location 3','616 Medary Avenue Brookings SD']
];

var infowindow = new google.maps.InfoWindow();

/*creates the map object FP*/
function initMap(){
//variable to create the map option parameters. FP
const options = {
zoom:15,
center: {lat:43.5460, lng: -96.7313}
}

const map = new google.maps.Map(document.getElementById("map"),options);

var geocoder = new google.maps.Geocoder();

var marker, i;

for (i = 0; i < locations.length; i++) {
  geocodeAddress(locations[i]);
}

function geocodeAddress(location) {
    geocoder.geocode( { 'address': location[1]}, function(results, status) {
    //alert(status);
      if (status == google.maps.GeocoderStatus.OK) {
  
        //alert(results[0].geometry.location);
        map.setCenter(results[1].geometry.location);
        createMarker(results[1].geometry.location);
      }
      else
      {
        alert("some problem in geocode" + status);
      }
    }); 
  }
  
  function createMarker(latlng,html){
    var marker = new google.maps.Marker({
      position: latlng,
      map: map
    }); 
  
    google.maps.event.addListener(marker, 'mouseover', function() { 
      infowindow.setContent(html);
      infowindow.open(map, marker);
    });
          
    google.maps.event.addListener(marker, 'mouseout', function() { 
      infowindow.close();
    });
  }

//create the type of marker we want to use
const image = {
    url:'./pig.png',
    scaledSize: new google.maps.Size(24,24)
  };

//places the marker in the right location
var marker = new google.maps.Marker({
    position:{lat:43.5465, lng: -96.7315},
    map:map,
    icon:image

});

var infoWindow=new google.maps.InfoWindow({
    content:'<h1>Sioux Falls</h1>'
});

marker.addListener('click', function(){
    infoWindow.open(map,marker);
});

}

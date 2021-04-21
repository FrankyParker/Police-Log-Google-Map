/*Created on 04/17/2021 by Frank P and Prabin P
Description: Google maps geocoding api javascript.*/

/*Dependencies: index.html*/

//List of locations from array
var locations =[
    ['location 1','402 Medary Avenue Brookings SD'],['location 2','516 Medary Avenue Brookings SD'],
    ['location 3','616 Medary Avenue Brookings SD']
];



/*creates the map object FP*/
function initMap(){


 const styledMapType = new google.maps.StyledMapType(
    [
      { elementType: "geometry", stylers: [{ color: "#e4e8eb" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#3a4c57" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#def2ff" }] },
      {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [{ color: "#d8e4e6" }],
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "geometry.stroke",
        stylers: [{ color: "#d8e4e6" }],
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d8e4e6" }],
      },
      {
        featureType: "landscape.natural",
        elementType: "geometry",
        stylers: [{ color: "#d3e8d7" }],
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{ color: "#d8e4e6" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#93817c" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [{ color: "#8abd9b" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#447530" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#fafbff" }],
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [{ color: "#e6cada" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#eba4cd" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#809596" }],
      },
      {
        featureType: "road.highway.controlled_access",
        elementType: "geometry",
        stylers: [{ color: "#b56d96" }],
      },
      {
        featureType: "road.highway.controlled_access",
        elementType: "geometry.stroke",
        stylers: [{ color: "#cce3e1" }],
      },
      {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [{ color: "#806b63" }],
      },
      {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [{ color: "#657385" }],
      },
      {
        featureType: "transit.line",
        elementType: "labels.text.fill",
        stylers: [{ color: "#8f7d77" }],
      },
      {
        featureType: "transit.line",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#ebe3cd" }],
      },
      {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [{ color: "#dadde6" }],
      },
      {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [{ color: "#9dd7e3" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#92998d" }],
      },
    ],
    { name: "Styled Map" }
  );


//variable to create the map option parameters. FP
const options = {
zoom:15,
center: {lat:43.5460, lng: -96.7313},
mapTypeControlOptions: {
mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain", "styled_map"],
},
};
//gets the html google map element
const map = new google.maps.Map(document.getElementById("map"),options);
map.mapTypes.set("styled_map", styledMapType);
map.setMapTypeId("styled_map");


//Creates information window object
infoWindow = new google.maps.InfoWindow();
navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
		  var marker = new google.maps.Marker({
		  position: pos,
		  map: map,
		  icon: myLocationImage
		}); 
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );

//create the type of marker we want to use
const image = {
    url:'./pig.png',
    scaledSize: new google.maps.Size(24,24)
  };
  
 const myLocationImage={
	url: './myLocation.svg',
	scaledSize: new google.maps.Size(50,50)
	}; 
  
 //Geocoding portion//
//creates object for geocoding
var geocoder = new google.maps.Geocoder();
//Counting variable for access the address array.
var marker, i;
//Runs the geocode address function from the web scraped data.
for (i = 0; i < locations.length; i++) {
  geocodeAddress(locations[i]);
}


//function to geocode the address and handle errors.
function geocodeAddress(location) {
    geocoder.geocode( { 'address': location[1]}, function(results, status) {
    //alert(status);
      if (status == google.maps.GeocoderStatus.OK) {
  
        //alert(results[1].geometry.location);
        map.setCenter(results[1].geometry.location);
        createMarker(results[1].geometry.location);
      }
      else
      {
        alert("some problem in geocode" + status);
      }
    }); 
  }
  
  //create a marker at every properly geocoded address.
  function createMarker(latlng,html){
    var marker = new google.maps.Marker({
      position: latlng,
      map: map,
	  icon: image
    }); 

	//create the information window
	const infowindow = new google.maps.InfoWindow();

	//this is where we want to put the column name + associated data 
	//date: 01/01/2021 intersection: street x, street y incident: incident data
	var html = "<h1>Frank</h1>";
	
	//Creates the information window on mouseover
    google.maps.event.addListener(marker, 'mouseover', function() { 
      infowindow.setContent(html);
      infowindow.open(map, marker);
    });
    
	//Closes the information window on mouseover
    google.maps.event.addListener(marker, 'mouseout', function() { 
      infowindow.close();
    });
  }


}

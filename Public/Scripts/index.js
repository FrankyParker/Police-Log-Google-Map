/*Created on 04/17/2021 by Frank P and Prabin P
Description: Google maps geocoding api javascript.*/

/*Dependencies: index.html*/

/******************************/
/**        DATA SECTION      **/
/*******************************/

//List of locations from array
var locations =[
    ['location 1','402 Medary Avenue Brookings SD'],['location 2','516 Medary Avenue Brookings SD'],
    ['location 3','616 Medary Avenue Brookings SD']
];


/********************************/
/***    INFO TABLE SECTION    ***/
/********************************/
//create variable counter to help in getting every 6th item in the array
var counter = 1;
var addressList = [];
function getData(){
  //create the var info to create the table from the array
  var info = "<table class = 'table table-border table-striped'><tr><th>Date</th><th>Street Name</th><th>Closester Intersection</th><th>Call Type</th><th>Incident Number</th><th>CFS Dispo</th></tr><tr>";
  var infoString= document.getElementById("data").innerHTML;
  var infoArray = infoString.split(',');
  for (i = 0; i < infoArray.length; i++){
    counter ++;
    //here the count is equal to 1 and less than 7. It's going to create 5 columns
    if(counter<7){
        info+="<td>"+infoArray[i] + "</td>"
    }
    //We want to make a row for every 6th element in the array. 
    else{
        counter = 1;
         info += "<td>" + infoArray[i] + "</td></tr><tr>"
    }
  }
  counter = 1;
  info += "</table>"
  document.getElementById("infotable").innerHTML= info;
  var address = [];
  for (i = 0; i < infoArray.length; i++){
    counter ++;
  if(counter<7){
    if (counter == 4){
      if (infoArray[i] ==""){
        address.push("311 E 14th St Sioux Falls SD");
      }
      else{
        address.push(infoArray[i] + " Sioux Falls SD");
      }
    }
    else{
      address.push(infoArray[i]);
    }
  }
  else{
    addressList.push(address);
    counter=1;
    address=[];
  }
  };
};

/*******************************/
/**       CHART SECTION       **/
/*******************************/
  // Load the Visualization API and the corechart package.
  google.charts.load('current', {'packages':['corechart']});
  //create the chart
  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
	// Create the data table.
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Topping');
	data.addColumn('number', 'Slices');
	data.addRows([
	  ['Mushrooms', 3],
	  ['Onions', 1],
	  ['Olives', 1],
	  ['Zucchini', 1],
	  ['Pepperoni', 2]
	]);
	// Set chart options
	var options = {'title':'How Much Pizza I Ate Last Night',
				   'width':400,
				   'height':300};
	// Instantiate and draw our chart, passing in some options.
	var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  chart.draw(data, options);
  };

/*******************************/
/*** EVENT HANDLER SECTION   ***/
/*******************************/
  var show;
  function show_hide(show){
    var show = document.getElementById("chart_div");
    if (show.style.display === "none") {
      show.style.display = "block";
    } else {
      show.style.display = "none";
    }
  }

  function show_hide_table(show){
    var show = document.getElementById("infobox");
    var map = document.getElementById("map")
    if (show.style.display === "none") {
      show.style.display = "block";
      map.style.height = "71.8%";
    } else {
      show.style.display = "none";
      map.style.height = "96.8%";
    }
  };

/*******************************/
/**      MAP SECTION          **/
/*******************************/
/*creates the map FUNCTION FP*/
function initMap(){

/********** MAP STYLE **********/
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
//*********** END MAP STYLE ************/


/*variable to create the map option parameters. FP*/
  const options = {
    zoom:15,
    center: {lat:43.5460, lng: -96.7313},
    mapTypeControlOptions: {
    mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain", "styled_map"],},
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
        icon:myLocationImage
      }); 
          },
          () => {
            handleLocationError(true, infoWindow, map.getCenter());
          }
        );
  
/******************************************/
/*********** GEOCODING PORTION ************/
/******************************************/
//creates object for geocoding
var geocoder = new google.maps.Geocoder();
//Counting variable for access the address array.
var marker, i;
//Runs the geocode address function from the web scraped data.
for (i = 0; i < 10; i++) {
  geocodeAddress(addressList[i]);
}

//function to geocode the address and handle errors.
function geocodeAddress(location) {
    geocoder.geocode( { 'address': location[2]}, function(results, status) {
    //alert(status);
      if (status == google.maps.GeocoderStatus.OK) {
        var tableHeader = "<table class = 'table table-bordered table-striped'><th scope = 'col'></th><th scope = 'col'></th><tr>";
        var html = tableHeader + "<td style = 'text-align: right'>Date</td><td>" + location[0] + "</td></tr><tr><td style = 'text-align: right'>Street</td><td>" +
         location[1] + "</td></tr><tr><td>Intersection</td><td>" + location[2] 
         + "</td></tr><tr><td style = 'text-align: right'>Crime</td><td>" + location[3]  + "</td></tr><tr><<td style = 'text-align: right'>Dispo</td><td>" + location[4] +
         "</td></tr>" + "</table>";
        //alert(results[1].geometry.location);
        map.setCenter(results[0].geometry.location);
        createMarker(results[0].geometry.location,html);
      }
      else
      {
        alert("some problem in geocode" + status + location[2]);
      }
    }); 
  }


  /************* START MARKER APPEARANCE SECTION ***************/

    const image = {
      url:'../Resources/pig.png',
      scaledSize: new google.maps.Size(24,24)
    };
    const myLocationImage={
    url: '../Resources/myLocation.svg',
    scaledSize: new google.maps.Size(50,50)
    };
  /*************** END MARKER APPEARANCE SECTION ******************/

  /********************CREATE MARKERS************************ */
  //create a marker at every properly geocoded address.
  function createMarker(latlng,html){
    var marker = new google.maps.Marker({
      position: latlng,
      map: map,
      icon:image
    }); 
  /******************** END MARKER CREATION ******************/

  /******************** START INFO WINDOW APPEARANCE**********/
	//create the information window
    const infowindow = new google.maps.InfoWindow();
    //this is where we want to put the column name + associated data 

	
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

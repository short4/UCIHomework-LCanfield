
// Create queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(response) {
  createFeatures(response.features);
});
function createColors(depth){
  if (depth>90){
    return "red"
  }
  else if (depth >70){
    return "orange"
  }
  else if (depth >50){
    return "orangeRed"
  }
  else if (depth >30){
    return "yellow"
  }
  else if (depth >10){
    return "yellowGreen"
  }
  else 
    return "lightGreen"
};

function createSize(magnitude){
  return magnitude * 40000
};

//Get place and depth of earthquake
function createFeatures(earthquakeData){

  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" +feature.properties.place + "</h3>,hr><p>" + feature.geometry.coordinates[2] + "<h3>" + feature.properties.mag + "</h3>");
  }

  var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function (feature, pointPosition){
      return new L.circle(pointPosition, 
        {
          radius: createSize(feature.properties.mag),
          fillColor: createColors(feature.geometry.coordinates[2]),
          color: "white",
          fillOpacity: .5,
          opacity: .75,
          stroke: true,
          weight: .5
        })
    },
    onEachFeature: onEachFeature
  });

  createMap(earthquakes);
}

function createMap(earthquakes){
   
// Define tileLayer
  var tileLayer = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  });

 


  var overlayMap = {
    Earthquakes: earthquakes
  };

   // Create map
   var myMap = L.map("mapid", {
    center: [
      37.09, -95.71],
    zoom: 2,
    layers: [tileLayer, earthquakes]
  });

  L.control.layers(overlayMap, {
    collapsed: false
  }).addTo(myMap);

  var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        depth = [-10, 10, 30, 50, 70, 90],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < depth.length; i++) {
        div.innerHTML +=
            '<i style="background:' + createColors(depth[i] + 1) + '"></i> ' +
            depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);

//   var legend = L.control({position: 'bottomleft'});
//   legend.onAdd = function () {
//     var infoDiv = L.DomUtil.create('div', 'info legend'),
//                   depth = [ '-10 to 10', '10 to 30', '30 to 50', '50 to 70', '70 to 90','>90'],
//                   colors = [ "Green",
//                   "greenyellow",
//                   "Orange",
//                   "OrangeRed",
//                   "Red",
//                   "Maroon"];
//     infoDiv.innerHTML += '<div align= "center"><strong> Depth </strong></div> <br>'
//     // loop through our density intervals and generate a label with a colored square for each interval
//     for (var i = 0; i < depth.length; i++) {
//         infoDiv.innerHTML +=
//             '<i style="background:' + colors[i] + '"></i> ' +
//             depth[i] + '<br>'+ '<br>';
//     };
//     return infoDiv;
//  };
//     legend.addTo(myMap);

  // var legend = L.control({position: 'bottomleft'});

  // legend.onAdd = function () {
  
  //     var div = L.DomUtil.create('div', 'info legend'),
  //         depth = ["-10-10", "10-30", "30-50", "50-70", "70-90", "90+"],
  //     colors = ["lightGreen", "yellowGreen", "yellow", "orangeRed", "orange", "red"];
  
  //     // loop through our density intervals and generate a label with a colored square for each interval
  //     for (var i = 0; i < depth.length; i++) {
  //         div.innerHTML +=
  //             '<i style="background:' + colors[i] + '"></i> ' +
  //             depth[i] + '<br>'; 
  //     }
  
  //     return div;
  // };
  // legend.addTo(myMap);
}


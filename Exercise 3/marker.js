//Global variable to save the selected route, used for refreshing bus position
let savedRoute;

//Draws the markers on the marker layer
function drawMarker(lon, lat) {
    let coords = [lon, lat];
    let source = map.getLayers()["array_"][1].getSource();

    source.addFeature(
        new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat(coords)))
    );
}
//Gets the information about the busses from the föli API
function getVehicles() {
    var xhr = new XMLHttpRequest();
    xhr.onload = findBuses;
    xhr.open("get", "https://data.foli.fi/siri/vm", true);
    xhr.send();
}


/*Parses the JSON and adds the vehicles into an array instead of an object.
Retrieves the selected route and finds vehicles which are on that route and find their coordinates
*/
function findBuses() {
    var data = JSON.parse(this.responseText);
    var vehicleList = Object.values(data.result.vehicles);

    var x = document.getElementById("routelist");

    //gets the selected route and saves it for refreshing
    let selRoute = x.options[x.selectedIndex].value;
    savedRoute = selRoute;
    
    //Before finding the vehicles position the existing markers are removed
    clearMarkers();
    for (let i = 0; i < vehicleList.length; i++) {
        if (vehicleList[i].publishedlinename === selRoute) {
            let bus = vehicleList[i];
            let lon = bus.longitude;
            let lat = bus.latitude;
            drawMarker(lon, lat);
        }
    }
}
//removes all drawn layers on the map
function clearMarkers() {
    let source = map.getLayers()["array_"][1].getSource();
    source.clear();
}

function refresh(){
    var xhr = new XMLHttpRequest();
    xhr.onload = refreshBuses;
    xhr.open("get", "https://data.foli.fi/siri/vm", true);
    xhr.send();
}

//Clears the current markers then draws the buses new positions based on the savedRoute variable
function refreshBuses(){
    clearMarkers();
    var data = JSON.parse(this.responseText);
    var vehicleList = Object.values(data.result.vehicles);

    for (let i = 0; i < vehicleList.length; i++) {
        if (vehicleList[i].publishedlinename === savedRoute) {
            let bus = vehicleList[i];
            let lon = bus.longitude;
            let lat = bus.latitude;
            drawMarker(lon, lat);
        }
    }
}

function drawMarker(lon, lat) {
    let coords = [lon, lat];
    let source = map.getLayers()["array_"][1].getSource();

    source.addFeature(
        new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat(coords)))
    );
}

function getVehicles() {
    var xhr = new XMLHttpRequest();
    xhr.onload = findBuses;
    xhr.open("get", "http://data.foli.fi/siri/vm", true);
    xhr.send();
}

function findBuses() {
    var data = JSON.parse(this.responseText);
    var vehicleList = Object.values(data.result.vehicles);

    var x = document.getElementById("routelist");
    let selRoute = x.options[x.selectedIndex].value;
    console.log(selRoute);
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

function clearMarkers() {
    let source = map.getLayers()["array_"][1].getSource();
    let source2 = map.getLayers()["array_"][2].getSource();
    source.clear();
    source2.clear();
}

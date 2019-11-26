//Initializes the site by getting each bus line from the Föli API
var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.onerror = reqError;
oReq.open("get", "https://data.foli.fi/gtfs/routes");
oReq.send();

//Prases the JSON and adds each bus line found to the drop down menu in the HTML
function reqListener() {
    var data = JSON.parse(this.responseText);
    console.log(data);
    var list = document.getElementById("routelist");

    for (var i = 0; i < data.length; i++) {
        var route = data[i];
        var opt = document.createElement("option");
        opt.textContent = route.route_long_name;
        opt.value = route.route_id;
        list.appendChild(opt);
    }
}

function reqError(err) {
    console.log("Fetch Error :-S", err);
}

//Retrieves information about the route selected from the Föli API
function getBusRoute(){
    var x = document.getElementById("routelist");
    var selRoute = x.options[x.selectedIndex].value;
    var xhr = new XMLHttpRequest();
    xhr.open("get", "https://data.foli.fi/gtfs/trips/route/" + selRoute, true);
    xhr.onload = getShape;
    xhr.onerror = reqError;
    xhr.send();   
}

//Retrieves the shape of the selected route from the Föli API
function getShape(){
    var data = JSON.parse(this.response);
    var shapeid = data[0].shape_id;

    var xhr = new XMLHttpRequest();
    xhr.open("get", "https://data.foli.fi/gtfs/shapes/" + shapeid, true);
    xhr.onload = drawRoute;
    xhr.onerror = reqError;
    xhr.send();   
}

//Draws the shape of the route from the Föli API by drawing lines between each coordinate in the shape JSON
function drawRoute(){
    if(this.status === 200) {
        let data = JSON.parse(this.response);
        let coords = [];

        for (let i=0; i < data.length; i++) {
            coords.push(
                new ol.proj.fromLonLat([
                    data[i]["lon"],
                    data[i]["lat"]
                ])
            )
        }
        //Before drawing the new route every drawn layer is removed from the map
        let source = map.getLayers()["array_"][2].getSource();
        let source2 = map.getLayers()["array_"][1].getSource();
        source2.clear();
        source.clear();
        source.addFeature(
            new ol.Feature(
                new ol.geom.LineString(coords)
            )
        )
    }
}

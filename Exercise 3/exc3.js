var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.onerror = reqError;
oReq.open("get", "http://data.foli.fi/gtfs/routes", true);
oReq.send();

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

/*
From ROUTES get route_id ^
From TRIPS get trip with route_id 
From trip get shape_id
From SHAPES get shape coords
*/
function getBusRoute(){
    var x = document.getElementById("routelist");
    var selRoute = x.options[x.selectedIndex].value;
    console.log(selRoute);
    var xhr = new XMLHttpRequest();
    xhr.open("get", "http://data.foli.fi/gtfs/trips/route/" + selRoute, true);
    xhr.onload = getShape;
    xhr.send();   
}

function getShape(){
    var data = JSON.parse(this.response);
    var shapeid = data[0].shape_id;

    var xhr = new XMLHttpRequest();
    xhr.open("get", "http://data.foli.fi/gtfs/shapes/" + shapeid, true);
    xhr.onload = drawRoute;
    xhr.send();   
}

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

function reqListener() {
    var data = JSON.parse(this.responseText);
    console.log(data);
    var list = document.getElementById("routelist");

    for (var i = 0; i < data.length; i++) {
        var route = data[i];
        var opt = document.createElement("option");
        opt.textContent = route.route_long_name;
        opt.value = route.route_long_name;
        list.appendChild(opt);
    }
}

function reqError(err) {
    console.log("Fetch Error :-S", err);
}

var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.onerror = reqError;
oReq.open("get", "http://data.foli.fi/gtfs/routes", true);
oReq.send();
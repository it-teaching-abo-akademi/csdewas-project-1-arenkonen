const map = new ol.Map({
    target: "map",
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        }),
        new ol.layer.Vector({
            source: new ol.source.Vector(),
            style: new ol.style.Style({
                image: new ol.style.Icon({
                    src: "https://maps.google.com/mapfiles/ms/micons/blue.png",
                    anchor: [0.5, 32],
                    anchorXUnits: "fraction",
                    anchorYUnits: "pixels",
                    opacity: 1,
                    scale: 1
                })
            })
        }),
        new ol.layer.Vector({
            source: new ol.source.Vector(),
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: "#8d0000",
                    width: 5
                })
            })
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([22.282578, 60.457086]),
        zoom: 10
    })
});

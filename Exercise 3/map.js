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
                    src: "busicon.png",
                    anchor: [0.5, 1],
                    anchorXUnits: "fraction",
                    anchorYUnits: "fraction",
                    opacity: 1,
                    scale: 0.4
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

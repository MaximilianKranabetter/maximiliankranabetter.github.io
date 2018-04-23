
let myMap = L.map("mapdiv");            // http://leafletjs.com/reference-1.3.0.html#map-l-map
let myLayers = {
    osm : L.tileLayer(                  // http://leafletjs.com/reference-1.3.0.html#tilelayer-l-tilelayer
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"            // bis jetzt keinen weiteren Kartendienst gefunden, um Objekt hinzuzufügen
    ),
    geolandbasemap : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"],                              // http://leafletjs.com/reference-1.3.0.html#tilelayer-subdomains
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"        // http://leafletjs.com/reference-1.3.0.html#layer-attribution
        }
    ),
    bmapoverlay : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"],
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmapgrau : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"],
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmaphidpi : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"],
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmaporthofoto30cm : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"],
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
};

myMap.addLayer(myLayers.bmaporthofoto30cm);         // http://leafletjs.com/reference-1.3.0.html#map-addlayer


let myMapControl = L.control.layers({               // http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers
    "Openstreetmap" : myLayers.osm,
    "basemap.at Grundkarte" : myLayers.geolandbasemap,
    "basemap.at grau" : myLayers.bmapgrau,
    "basemap.at highdpi" : myLayers.bmaphidpi,
    "basemap.at Orthofoto" : myLayers.bmaporthofoto30cm
},{
    "basemap.at Overlay" : myLayers.bmapoverlay
},{
    collapsed: false // http://leafletjs.com/reference-1.3.0.html#control-layers-collapsed
});

myMap.addControl(myMapControl);

L.control.scale({               // http://leafletjs.com/reference-1.3.0.html#control-scale-l-control-scale
    position: "bottomleft",     // http://leafletjs.com/reference-1.3.0.html#control-scale-position
    metric: true,               // http://leafletjs.com/reference-1.3.0.html#control-scale-metric
    maxWidth: 200,              // http://leafletjs.com/reference-1.3.0.html#control-scale-maxwidth
}).addTo(myMap);                // http://leafletjs.com/reference-1.3.0.html#control-scale-addto


myMap.setView([47.267,11.383], 11);


let myMap = L.map("mapdiv");            // http://leafletjs.com/reference-1.3.0.html#map-l-map
let markerGroup = L.featureGroup();

let myLayers = {
    osm : L.tileLayer(                  // http://leafletjs.com/reference-1.3.0.html#tilelayer-l-tilelayer
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            subdomains : ["a", "b", "c"],   // habe Laura und Michaela gefragt, wie das geht :)
            attribution : "Datenquelle: <a href='https://www.openstreetmap.org'>© OpenStreetMap-Mitwirkende</a>"
        }
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

myMap.addLayer(myLayers.geolandbasemap);         // http://leafletjs.com/reference-1.3.0.html#map-addlayer

let myMapControl = L.control.layers({               // http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers
    "Openstreetmap" : myLayers.osm,
    "Basemap Grundkarte" : myLayers.geolandbasemap,
    "Basemap grau" : myLayers.bmapgrau,
    "Basemap highdpi" : myLayers.bmaphidpi,
    "Basemap Orthofoto 30cm" : myLayers.bmaporthofoto30cm
},{
    "Basemap Overlay" : myLayers.bmapoverlay,
    "Marker" : markerGroup
},{
    collapsed: false // http://leafletjs.com/reference-1.3.0.html#control-layers-collapsed
});

myMap.addControl(myMapControl);

L.control.scale({               // http://leafletjs.com/reference-1.3.0.html#control-scale-l-control-scale
    position: "bottomleft",     // http://leafletjs.com/reference-1.3.0.html#control-scale-position
    metric: true,               // http://leafletjs.com/reference-1.3.0.html#control-scale-metric
    imperial: false,            // http://leafletjs.com/reference-1.3.0.html#control-scale-imperial
    maxWidth: 200,              // http://leafletjs.com/reference-1.3.0.html#control-scale-maxwidth
}).addTo(myMap);                // http://leafletjs.com/reference-1.3.0.html#control-scale-addto


myMap.setView([47.267,11.383], 11);

const uni = [47.264,11.385];
const usi = [47.257,11.356];
const technik = [47.263,11.343];
const igls = [47.232,11.408];
const patscherkofel = [47.209,11.461];

myMap.addLayer(markerGroup);

const markerOptions = {
    title: "Universität Innsbruck",
    opacity: 0.6,
    draggable: true
};

const markerOption2 = {
    title: "Igls Ortschaft"
};

const markerOption3 = {
    title: "Patscherkofel"
};

L.marker(uni, markerOptions).addTo(markerGroup);
L.marker(usi, markerOptions).addTo(markerGroup);
L.marker(technik, markerOptions).addTo(markerGroup);

L.marker(igls,markerOption2).addTo(markerGroup);

let patscherkofelMarker = L.marker(patscherkofel,markerOption3).addTo(markerGroup)

patscherkofelMarker.bindPopup("<p>Ausblick vom Patscherkofel</p><img style= 'width:160px' src='js/leaflet/images/patschfoto.jpg' alt='Patscherkofel'/>");

let linecords = [igls, patscherkofel];

let linie = L.polyline(linecords, {color: 'red'}).addTo(myMap);

let uniPolygon = L.polygon([uni,usi,technik]);
myMap.addLayer(uniPolygon);

myMap.fitBounds(markerGroup.getBounds());
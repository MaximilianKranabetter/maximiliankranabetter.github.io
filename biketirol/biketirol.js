let myMap = L.map("map", {
    fullscreenControl: true //Kontrolloption, um Karte als Fullscreen darzustellen
});

let etappe19Group = L.featureGroup().addTo(myMap);

let myLayers = {

    osm: L.tileLayer( 
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            subdomains: ['a', 'b', 'c'],
            attribution: "Datenquelle: <a href = 'https://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
        }
    ),
    geolandbasemap: L.tileLayer(
        'https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png', {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"], 
            attribution: "Datenquelle: <a href = 'https://www.basemap.at'>basemap.at</a>" 
        }
    ),
    gdi_summer: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_summer/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
            minZoom: 0,
            maxZoom: 18,    
            attribution: "Datenquelle: <a href = 'https://www.tirol.gv.at/statistik-budget/tiris/tiris-geodatendienste/impressum-elektronische-karte-tirol/'>Elektronische Karte Tirol</a>"
        }
    ),
    gdi_winter: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_winter/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
            minZoom: 0,
            maxZoom: 18,     
            attribution: "Datenquelle: <a href = 'https://www.tirol.gv.at/statistik-budget/tiris/tiris-geodatendienste/impressum-elektronische-karte-tirol/'>Elektronische Karte Tirol</a>"
        }
    ),
    gdi_ortho: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_ortho/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
            minZoom: 0,
            maxZoom: 18,     
            attribution: "Datenquelle: <a href = 'https://www.tirol.gv.at/statistik-budget/tiris/tiris-geodatendienste/impressum-elektronische-karte-tirol/'>Elektronische Karte Tirol</a>"
        }
    ),

    bmapoverlay: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href = 'https://www.basemap.at'>basemap.at</a>"
        }
    ),

};

myMap.addLayer(myLayers.geolandbasemap); //Die Geolandbasemap als Default anzeigen lassen

myMap.addLayer(etappe19Group);

let myMapControl = L.control.layers({   //Kontrollmenü für die Layer
    "Openstreetmap": myLayers.osm,
    "basemap.at Grundkarte": myLayers.geolandbasemap,
    "Elektronische Karte Tirol Sommer": myLayers.gdi_summer,
    "Elektronische Karte Tirol Winter": myLayers.gdi_winter,
    "Elektronische Karte Tirol Orthofoto": myLayers.gdi_ortho
}, {
    "basemap.at Overlay": myLayers.bmapoverlay,
    "Etappe 19: ": etappe19Group,   //feature Group dem Overlay-Layer hinzufügen
    //'Group: ': marker,
}, {
    collapsed: true //das Menü nicht automatisch aufmachen

}).addTo(myMap);

//Maßstab
let mayScale = L.control.scale({
    maxWidth: 200,
    metric: true,
    imperial: false,
}).addTo(myMap);

const start = [47.162648,11.745063];
const finish = [47.298682,11.666158];

/*
    Vorbereitung: GPX Track herunterladen und nach GeoJSON konvertieren
    -------------------------------------------------------------------
    :) Datenquelle https://www.data.gv.at/suche/?search-term=bike+trail+tirol&searchIn=catalog
    :) Download Einzeletappen / Zur Ressource ...
    :) Alle Dateien im unterverzeichnis data/ ablegen
    :) Die .gpx Datei der eigenen Etappe als etappe00.gpx speichern
    :) Die .gpx Datei über https://mapbox.github.io/togeojson/ in .geojson umwandeln und als etappe00.geojson speichern
    :) Die etappe00.geojson Datei in ein Javascript Objekt umwandeln und als etappe00.geojson.js speichern

    -> statt 00 natürlich die eigene Etappe (z.B. 01,02, ...25)
*/

// :) eine neue Leaflet Karte definieren

// :) Grundkartenlayer mit OSM, basemap.at, Elektronische Karte Tirol (Sommer, Winter, Orthophoto jeweils mit Beschriftung) über L.featureGroup([]) definieren
// :) WMTS URLs siehe https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol

// :) Maßstab metrisch ohne inch

// Start- und Endpunkte der Route als Marker mit Popup, Namen, Wikipedia Link und passenden Icons für Start/Ziel von https://mapicons.mapsmarker.com/

// GeoJSON Track als Linie in der Karte einzeichnen und auf Ausschnitt zoomen
// Einbauen nicht über async, sondern über ein L.geoJSON() mit einem Javascript Objekt (wie beim ersten Stadtspaziergang Wien Beispiel)

// Baselayer control für OSM, basemap.at, Elektronische Karte Tirol hinzufügen

// Overlay controls zum unabhängigem Ein-/Ausschalten der Route und Marker hinzufügen

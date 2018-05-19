// Leaflet Karte initialisieren
let myMap = L.map("map", {
    fullscreenControl: true,
});

// Layer für Track und Marker hinzufügen
let overlayTrack = L.featureGroup().addTo(myMap);
let overlayMarker = L.featureGroup().addTo(myMap);

// Grundkartenlayer mit OSM, basemap.at, Elektronische Karte Tirol (Sommer, Winter, Orthophoto jeweils mit Beschriftung)
const grundkartenLayer = {
    osm: L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            subdomains: ["a", "b", "c"],
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
    ),
    geolandbasemap: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmapoverlay: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmapgrau: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmaphidpi: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmaporthofoto30cm: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    tiris_sommer: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_base_summer/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
            attribution: "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>eKarte Tirol</a>"
        }
    ),
    tiris_winter: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_base_winter/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
            attribution: "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>eKarte Tirol</a>"
        }
    ),
    tiris_ortho: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_ortho/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
            attribution: "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>eKarte Tirol</a>"
        }
    ),
    tiris_nomenklatur: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_nomenklatur/GoogleMapsCompatible/{z}/{x}/{y}.png8", {
            attribution: "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>eKarte Tirol</a>",
            pane: "overlayPane",
        }
    ),
}

// Layergruppen für die Elektronische Karte Tirol definieren
const tirisSommer = L.layerGroup([
    grundkartenLayer.tiris_sommer,
    grundkartenLayer.tiris_nomenklatur
]);
const tirisWinter = L.layerGroup([
    grundkartenLayer.tiris_winter,
    grundkartenLayer.tiris_nomenklatur
]);
const tirisOrtho = L.layerGroup([
    grundkartenLayer.tiris_ortho,
    grundkartenLayer.tiris_nomenklatur
]);

// Map control mit Grundkarten und GeoJSON Overlay definieren
let mapSelection = L.control.layers({
    "Openstreetmap": grundkartenLayer.osm,
    "basemap.at Grundkarte": grundkartenLayer.geolandbasemap,
    "basemap.at grau": grundkartenLayer.bmapgrau,
    "basemap.at Orthofoto": grundkartenLayer.bmaporthofoto30cm,
    "Elektronische Karte Tirol - Sommer" : tirisSommer,
    "Elektronische Karte Tirol - Winter" : tirisWinter,
    "Elektronische Karte Tirol - Orthophoto" : tirisOrtho,
}, {
    "GPS-Track": overlayTrack,
    "Start / Ziel": overlayMarker,
});
myMap.addControl(mapSelection);
myMap.addLayer(tirisSommer);
myMap.setView([47.426944, 11.421667],10);   // Karwendelhaus!!!!ändern

// Maßstabsleiste metrisch hinzufügen
L.control.scale({
    maxWidth: 200,
    imperial: false,
}).addTo(myMap);

// Start- und Endpunkte der Route als Marker mit Popup, Namen, Wikipedia Link und passenden Icons für Start/Ziel von https://mapicons.mapsmarker.com/
L.marker([47.162648,11.745063],{
    icon : L.icon({
        iconUrl : "images/start.png",
        iconAnchor : [24,48],
        popupAnchor : [0,-48],
    })
}).bindPopup(
    "<h3>Scharnitz</h3><p><a href='https://de.wikipedia.org/wiki/Scharnitz'>Wikipedia Link</a></p>"
).addTo(overlayMarker);

L.marker([47.298682,11.666158],{
    icon : L.icon({
        iconUrl : "images/finish.png",
        iconAnchor : [24,48],
        popupAnchor : [0,-48],
    })
}).bindPopup(
    "<h3>Maurach - Buchau</h3><p><a href='https://de.wikipedia.org/wiki/Eben_am_Achensee'>Wikipedia Link</a></p>"
).addTo(overlayMarker)

// GPX Track direkt laden und auf Ausschnitt zoomen

let gpxTrack = new L.GPX("data/etappe19.gpx", {
    async: true
}).addTo(overlayTrack);
gpxTrack.on('loaded', function(evt) {
    let track = evt.target;
    console.log("get_distance",       track.get_distance().toFixed(0))
    console.log("get_elevation_min",  track.get_elevation_min().toFixed(0))
    console.log("get_elevation_max",  track.get_elevation_max().toFixed(0))
    console.log("get_elevation_gain", track.get_elevation_gain().toFixed(0))
    console.log("get_elevation_loss", track.get_elevation_loss().toFixed(0))
    karte.fitBounds(track.getBounds());

    document.getElementById("get_distance").innerHTML = track.get_distance().toFixed(0);
});


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

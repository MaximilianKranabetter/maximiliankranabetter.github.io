// Leaflet Karte initialisieren
let myMap = L.map("map", {
    fullscreenControl: true,
});

// Layer für Track und Marker hinzufügen
let overlayTrack = L.featureGroup().addTo(myMap);
let overlayMarker = L.featureGroup().addTo(myMap);
let overlaySteigung = L.featureGroup().addTo(myMap);

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
    "GPS-Track" : overlayTrack,
    "Start / Ziel" : overlayMarker,
    "Steigungslinie" : overlaySteigung,
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
        iconAnchor : [16,37],
        popupAnchor : [0,-37],
    })
}).bindPopup(
    "<h3>Lanersbach (Gemeinde Tux)</h3><p><a href='https://de.wikipedia.org/wiki/Tux_(Tirol)#Lanersbach'>Wikipedia Link</a></p>"
).addTo(overlayMarker);

L.marker([47.298682,11.666158],{
    icon : L.icon({
        iconUrl : "images/finish.png",
        iconAnchor : [16,37],
        popupAnchor : [0,-37],
    })
}).bindPopup(
    "<h3>Weerberg</h3><p><a href='https://de.wikipedia.org/wiki/Weerberg'>Wikipedia Link</a></p>"
).addTo(overlayMarker)

// Höhenprofil control
let profil = L.control.elevation({
    position : "topright",
    theme : "steelblue-theme",
    collapsed : true
}).addTo(myMap);


// GPX Track direkt laden und auf Ausschnitt zoomen

let gpxTrack = new L.GPX("data/etappe19.gpx", {
    async: true
}).addTo(overlayTrack);
gpxTrack.on('loaded', function(evt) {
    let track = evt.target;

    let laenge = evt.target.get_distance().toFixed(0);
    document.getElementById("laenge").innerHTML=laenge;
    // console.log("get_distance",       track.get_distance().toFixed(0))

    let elevmin = evt.target.get_elevation_min().toFixed(0);
    document.getElementById("elevmin").innerHTML=elevmin;
    // console.log("get_elevation_min",  track.get_elevation_min().toFixed(0))

    let elevmax = evt.target.get_elevation_max().toFixed(0);
    document.getElementById("elevmax").innerHTML=elevmax;
    // console.log("get_elevation_max",  track.get_elevation_max().toFixed(0))

    let elevgain = evt.target.get_elevation_gain().toFixed(0);
    document.getElementById("elevgain").innerHTML=elevgain;
    // console.log("get_elevation_gain", track.get_elevation_gain().toFixed(0))

    let elevloss = evt.target.get_elevation_loss().toFixed(0);
    document.getElementById("elevloss").innerHTML=elevloss;
    // console.log("get_elevation_loss", track.get_elevation_loss().toFixed(0))

    myMap.fitBounds(track.getBounds());

});

gpxTrack.on("addline", function(evt){
    profil.addData(evt.line);
    console.log(evt.line);
    console.log(evt.line.getLatLngs());
    console.log(evt.line.getLatLngs()[0]);
    console.log(evt.line.getLatLngs()[0].lat);
    console.log(evt.line.getLatLngs()[0].lng);
    console.log(evt.line.getLatLngs()[0].meta);
    console.log(evt.line.getLatLngs()[0].meta.ele);

    // alle Segmente der Steigungslinie hinzufügen
    let gpxLinie = evt.line.getLatLngs();
    for (let i = 1; i < gpxLinie.length; i++) {
        let p1 = gpxLinie[i-1];
        let p2 = gpxLinie[i];
        
        // Empfernung zwischen Pumkten
        let distanz = myMap.distance(
            [p1.lat,p1.lng],
            [p2.lat,p2.lng]
        );
        
        // Höhenunterschied
        let delta = p2.meta.ele - p1.meta.ele;

        // Steigung in % berechnen
        let proz = (distanz > 0) ? (delta / distanz * 100.0).toFixed(1) : 0;
        
        // Bedingung ? Ausdruck 1 wenn ja : Ausdruck 2 wenn nein
    
        console.log(p1.lat,p1.lng,p2.lat,p2.lng,distanz,delta,proz);

        let farbe =
            proz > 10 ? "#b10026" :
            proz > 6 ? "#fc4e2a" :
            proz > 2 ? "##feb24c" :
            proz > 0 ? "#ffeda0" :
            proz > -2 ? "#b2e2e2" :
            proz > -6 ? "#66c2a4" :
            proz > -10 ? "#2ca25f" :
                        "#006d2c"

        let segment = L.polyline(
            [
                [p1.lat,p1.lng],
                [p2.lat,p2.lng],
            ], {
                color: farbe,
                weight: 10
            }
        ).addTo(overlaySteigung);
    }
});

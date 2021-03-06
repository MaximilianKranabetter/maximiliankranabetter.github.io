
let myMap = L.map("mapdiv");            // http://leafletjs.com/reference-1.3.0.html#map-l-map
const bikeGroup = L.markerClusterGroup();
let myLayers = {
    osm: L.tileLayer(                  // http://leafletjs.com/reference-1.3.0.html#tilelayer-l-tilelayer
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            subdomains: ["a", "b", "c"],   // habe Laura und Michaela gefragt, wie das geht :)
            attribution: "Datenquelle: <a href='https://www.openstreetmap.org'>© OpenStreetMap-Mitwirkende</a>"
        }
    ),
    geolandbasemap: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],                              // http://leafletjs.com/reference-1.3.0.html#tilelayer-subdomains
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"        // http://leafletjs.com/reference-1.3.0.html#layer-attribution
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
};

myMap.addLayer(myLayers.geolandbasemap);         // http://leafletjs.com/reference-1.3.0.html#map-addlayer


let myMapControl = L.control.layers({               // http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers
    "Openstreetmap": myLayers.osm,
    "Basemap Grundkarte": myLayers.geolandbasemap,
    "Basemap grau": myLayers.bmapgrau,
    "Basemap highdpi": myLayers.bmaphidpi,
    "Basemap Orthofoto 30cm": myLayers.bmaporthofoto30cm
}, {
        "Basemap Overlay": myLayers.bmapoverlay,
        "Citybike Stationen": bikeGroup
    }, {
        collapsed: false // http://leafletjs.com/reference-1.3.0.html#control-layers-collapsed
    });

myMap.addControl(myMapControl);

L.control.scale({               // http://leafletjs.com/reference-1.3.0.html#control-scale-l-control-scale
    position: "bottomleft",     // http://leafletjs.com/reference-1.3.0.html#control-scale-position
    metric: true,               // http://leafletjs.com/reference-1.3.0.html#control-scale-metric
    imperial: false,            // http://leafletjs.com/reference-1.3.0.html#control-scale-imperial
    maxWidth: 200,              // http://leafletjs.com/reference-1.3.0.html#control-scale-maxwidth
}).addTo(myMap);                // http://leafletjs.com/reference-1.3.0.html#control-scale-addto

// console.log("Stationen: ", stationen);

const myIcon = L.icon({
    iconUrl: 'bike.png' // https://mapicons.mapsmarker.com
})

async function addGeojson(url) {
    // console.log("Url wird geladen: ", url);
    const response = await fetch(url);
    // console.log("Response: ", response);
    const citybikedata = await response.json();
    console.log("GeoJson: ", citybikedata);
    const geojson = L.geoJSON(citybikedata, {
        style: function (feature) {
            return { color: "#ff0000" }
        },
        pointToLayer: function (geoJsonPoint, latlng) {
            return L.marker(latlng, {
                icon: myIcon
            });
        }
    }).addTo(bikeGroup);

    const hash = new L.Hash(myMap);

    myMap.addControl(new L.Control.Search({
        layer: bikeGroup,
        propertyName: 'STATION'
    }));


    let markers = L.markerClusterGroup();
    markers.addLayer(geojson);
    myMap.addLayer(markers);

}

const url = 'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:CITYBIKEOGD&srsName=EPSG:4326&outputFormat=json'

addGeojson(url);

//myMap.setView([47.267,11.383], 11);

myMap.addLayer(bikeGroup);
/* let geojson = L.geoJSON(spaziergang).addTo(wienGroup);
 geojson.bindPopup(function(layer) {
    const props = layer.feature.properties;
    const popupText = `<h1>${props.NAME}</h1>`; 
    return popupText; 
}); 

myMap.fitBounds(wienGroup.getBounds());
*/
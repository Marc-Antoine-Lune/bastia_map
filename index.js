// On initialise la latitude et la longitude 
var lat = 42.039604;
var lon = 9.012893;
var macarte = null;
var layerGroup = null;
var fondCarte = 'http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
var test = 0;
var id;




// Fonction d'initialisation de la carte
function initMap() {
    macarte = L.map('map').setView([lat, lon], 8);
    L.tileLayer(fondCarte, {
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 1,
        Zoom: 5
    }).addTo(macarte);
    layerGroup = L.layerGroup().addTo(macarte);

    fetch('https://marc-antoine-lune.github.io/bastia_map/bastia.geojson')
        .then(res => res.text())
        .then(kmltext => {
            const parser = new DOMParser();
            const kml = parser.parseFromString(kmltext, 'text/xml');
            const track = new L.KML(kml);
            macarte.addLayer(track);

            // Adjust map to show the kml
            const bounds = track.getBounds();
            macarte.fitBounds(bounds);


        })
}



window.onload = function() {
    // Fonction d'initialisation qui s'exécute lorsque le DOM est chargé
    initMap();
};
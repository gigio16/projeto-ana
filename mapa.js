const map = L.map('map').setView([-22.8527, -47.2181], 11); // Ponto médio entre Campinas e Hortolândia

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);

const pontosDeColeta = [
  { nome: "Ecoponto Campinas Centro", lat: -22.9056, lng: -47.0608 },
  { nome: "Coleta Seletiva Hortolândia Norte", lat: -22.8500, lng: -47.2180 },
  { nome: "Ponto Verde Jardim Nova Europa", lat: -22.9110, lng: -47.1260 },
  { nome: "Ecoponto Jardim Amanda", lat: -22.8490, lng: -47.2415 },
];

pontosDeColeta.forEach(ponto => {
  L.marker([ponto.lat, ponto.lng])
    .addTo(map)
    .bindPopup(`<strong>${ponto.nome}</strong>`);
});
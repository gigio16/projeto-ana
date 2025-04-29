const cores = ['#70cb7f', '#4b8055', '#ebddc4'];

new Chart(document.getElementById('grafico1'), {
  type: 'bar',
  data: {
    labels: ['Água', 'Energia', 'Alimento'],
    datasets: [{
      label: 'Desperdício (em toneladas)',
      data: [300, 150, 500],
      backgroundColor: cores
    }]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Desperdício de Recursos Naturais'
      }
    }
  }
});

new Chart(document.getElementById('grafico2'), {
  type: 'pie',
  data: {
    labels: ['Ar', 'Água', 'Solo'],
    datasets: [{
      label: 'Poluição (%)',
      data: [40, 35, 25],
      backgroundColor: cores
    }]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Poluição por Tipo de Meio'
      }
    }
  }
});

new Chart(document.getElementById('grafico3'), {
  type: 'line',
  data: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
    datasets: [{
      label: 'Acidentes Ambientais',
      data: [12, 19, 8, 15, 9],
      borderColor: '#70cb7f',
      backgroundColor: '#70cb7f',
      fill: false,
      tension: 0.3
    }]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Evolução de Acidentes Ambientais Mensais'
      }
    }
  }
});

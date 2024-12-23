document.querySelector('.heart').addEventListener('click', function() {
  const now = new Date();
  const targetDate = new Date(now.getFullYear(), 11, 24, 0, 0, 0); // 24 de diciembre a las 00:00 horas

  if (now >= targetDate) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'Cartita_de_amor.pdf', true); // Asegúrate de que sea el mismo nombre de tu carta
      xhr.responseType = 'blob';
      xhr.onload = function() {
          if (xhr.status === 200) {
              const blob = xhr.response;
              const link = document.createElement('a');
              link.href = window.URL.createObjectURL(blob);
              link.download = 'Cartita_de_amor.pdf'; // Nombre con el que se descarga la carta
              link.click();
              window.URL.revokeObjectURL(link.href);
          } else {
              console.error('No se pudo descargar el archivo.');
          }
      };
      xhr.send();
  } else {
      alert('La carta estará disponible para descargar el 24 de diciembre a las 00:00 horas.');
  }
});

// Configuración de la cuenta regresiva
const targetDate = new Date(new Date().getFullYear(), 11, 24, 0, 0, 0); // 24 de diciembre a las 00:00 horas
const savedCountdown = localStorage.getItem('countDownDate');
let countDownDate;

if (!savedCountdown || new Date(parseInt(savedCountdown, 10)) > targetDate) {
  countDownDate = targetDate.getTime();
  localStorage.setItem('countDownDate', countDownDate.toString());
} else {
  countDownDate = parseInt(savedCountdown, 10);
}

const x = setInterval(function() {
  const now = new Date().getTime();
  const distance = countDownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("countdown").textContent = `Nueva carta en: ${days}d ${hours}h ${minutes}m ${seconds}s`;

  if (distance < 0) {
      clearInterval(x); // Detiene el temporizador
      document.getElementById("countdown").textContent = "¡Nueva carta disponible!";
  }
}, 1000);
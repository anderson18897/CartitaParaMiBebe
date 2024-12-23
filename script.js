// Evento para el botón de descarga
document.querySelector('.heart').addEventListener('click', function () {
  const now = new Date(); // Fecha y hora actuales
  const targetDate = new Date(now.getFullYear(), 11, 24, 0, 0, 0); // 24 de diciembre a las 00:00 horas

  if (now >= targetDate) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'Cartita_de_amor.pdf', true); // Asegúrate de que el nombre coincida con el archivo
    xhr.responseType = 'blob';
    xhr.onload = function () {
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
let countDownDate = localStorage.getItem('countDownDate'); // Recupera la fecha guardada

if (!countDownDate || parseInt(countDownDate, 10) > targetDate.getTime()) {
  // Guarda la fecha objetivo si no existe o es incorrecta
  countDownDate = targetDate.getTime();
  localStorage.setItem('countDownDate', countDownDate.toString());
} else {
  countDownDate = parseInt(countDownDate, 10);
}

// Temporizador
const x = setInterval(function () {
  const now = new Date().getTime(); // Fecha y hora actuales en milisegundos
  const distance = countDownDate - now; // Diferencia en milisegundos

  // Calcula días, horas, minutos y segundos restantes
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Actualiza el texto del temporizador
  const countdownElement = document.getElementById("countdown");
  if (distance >= 0) {
    countdownElement.textContent = `Nueva carta en: ${days}d ${hours}h ${minutes}m ${seconds}s`;
  } else {
    clearInterval(x); // Detiene el temporizador cuando llega a cero
    countdownElement.textContent = "¡Nueva carta disponible!";
  }
}, 1000);

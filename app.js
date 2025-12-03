// Elementos del DOM
const alphaElement = document.getElementById('alpha');
const betaElement = document.getElementById('beta');

const gammaElement = document.getElementById('gamma');
const bubbleElement = document.getElementById('bubble');
const statusElement = document.getElementById('status');
const permissionButton = document.getElementById('requestPermission');

// 1. Verificar si el navegador soporta la API
if (!window.DeviceOrientationEvent) {
statusElement.textContent = "❌ Tu navegador no soporta la API de Orientación del Dispositivo.";
permissionButton.style.display = 'none';
} else {
statusElement.textContent = "✅ API soportada. Haz clic en 'Activar Sensor'.";
}

// 2. Solicitar permiso (algunos navegadores requieren un gesto del usuario)
permissionButton.addEventListener('click', () => {
// En dispositivos iOS/móviles, a menudo se requiere una interacción del usuario.
// La API de orientación no tiene un permiso explícito como la cámara,
// pero algunos navegadores la bloquean hasta que el usuario interactúa.

statusElement.textContent = "Sensor activado. Gira tu dispositivo.";
permissionButton.style.display = 'none';

// 3. Escuchar el evento de orientación
window.addEventListener('deviceorientation', (event) => {
// Los valores de orientación
const alpha = Math.round(event.alpha); // 0 a 360 grados (brújula)
const beta = Math.round(event.beta); // -180 a 180 grados (inclinación frontal)
const gamma = Math.round(event.gamma); // -90 a 90 grados (inclinación lateral)

// 4. Actualizar la interfaz
alphaElement.textContent = `${alpha}°`;
betaElement.textContent = `${beta}°`;
gammaElement.textContent = `${gamma}°`;

// 5. Mover la "burbuja" visualmente usando gamma (inclinación lateral) y beta (frontal)
// Normalizamos los valores para mover dentro del círculo (ejemplo simplificado)
const maxTilt = 45; // Máxima inclinación para el efecto visual
const posX = Math.max(Math.min(gamma / maxTilt * 150, 150), -150); // 150 es el radio útil
const posY = Math.max(Math.min(beta / maxTilt * 150, 150), -150);

bubbleElement.style.transform = `translate(-50%, -50%) translate(${posX}px, ${posY}px)`;
});
});

// (Opcional) Registrar Service Worker para hacerla una PWA completa
if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('/sw.js').catch(error => {
console.log('Error al registrar el Service Worker:', error);
});
}

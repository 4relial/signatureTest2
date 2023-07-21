const canvas = document.getElementById('signatureCanvas');
const context = canvas.getContext('2d');
let isDrawing = false;
let signatureData = '';

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  const x = e.offsetX;
  const y = e.offsetY;
  context.beginPath();
  context.moveTo(x, y);
});

canvas.addEventListener('mousemove', (e) => {
  if (isDrawing) {
    const x = e.offsetX;
    const y = e.offsetY;
    context.lineTo(x, y);
    context.stroke();
  }
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
  signatureData = canvas.toDataURL();
  document.getElementById('signatureInput').value = signatureData;
});

document.getElementById('clearBtn').addEventListener('click', () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  signatureData = '';
  document.getElementById('signatureInput').value = '';
});

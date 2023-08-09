const divModificar = document.getElementById('divModificar');
const miBoton = document.getElementById('miBoton');

divModificar.addEventListener('click', function() {
  alert('Hola! Soy el div');
});

miBoton.addEventListener('click', function() {
   event.stopPropagation();
});
const formulario= document.getElementById('formulario');
const botonRedirigir = document.getElementById('botton');

botonRedirigir.addEventListener('click', function(event) {
  event.preventDefault();
 
  if (esFormularioCorrecto()) {
   window.location.href = 'index.html';
  } else {
    alert('Por favor, complete los datos');
  }
});

function esFormularioCorrecto() {
  const usuarioF = document.getElementById('user');
  const passwordF = document.getElementById('password');
  
 if (usuarioF.value !== '' && passwordF.value !== '') {
    return true; 
  } else {
    return false; 
  }
}
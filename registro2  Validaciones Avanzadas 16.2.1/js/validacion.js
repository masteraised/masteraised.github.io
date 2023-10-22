(function () {
    'use strict'

    // Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
    var forms = document.querySelectorAll('.needs-validation')

    const pass2 = document.getElementById('password2')
    const pass1 = document.getElementById('password1')

    const alertDanger = document.getElementById('alert-danger')
    const regBtn = document.getElementById('regBtn')

    var form = document.getElementById("registroForm");


    // Bucle sobre ellos y evitar el envío
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                pass2.addEventListener("input", (event) => {
                    if ((pass2.value != pass1.value) || (!pass1.checkValidity())) {
                        pass2.setCustomValidity(' Las contraseñas deben ser iguales');
                    } else {
                        // input is fine -- reset the error message
                        pass2.setCustomValidity('');
                    }
                })

               
                form.classList.add('was-validated')
            }, false)
        })







})();

const terminosDiv = document.getElementById('terminosDiv')

// Ocultar el mensaje de error inicialmente
terminosDiv.style.display = "none";



const modalCheckbox = document.getElementById('invalidCheck')

regBtn.addEventListener("click", function () {
    console.log('hola mundo');
console.log(modalCheckbox);
    if (!modalCheckbox.checked) {
        terminosDiv.style.display = "block";
        button.style.color = 'red';
        divCondiciones.style.color = 'red';
    }
    else {
        terminosDiv.style.display = 'none'
        button.style.color = 'blue';
    }

});

var button = document.querySelector('[data-bs-target="#modalTerminos"]');


modalCheckbox.addEventListener("click", function () {
    console.log('hola modald');
    console.log(modalCheckbox.checked);

    if (modalCheckbox.checked) {
        terminosDiv.style.display = "none";
        button.style.color = 'blue';
   
    }

    else {
        terminosDiv.style.display = 'block'
        button.style.color = 'red';
        
    }
});


const divCondiciones = document.getElementById('divCondiciones');

modalCheckbox.addEventListener("click", function () {

    console.log('hola divCondiciones');
    console.log(modalCheckbox.checked);

    if (modalCheckbox.checked) {
        
        divCondiciones.style.color = 'green';
   
    }
    else {
        divCondiciones.style.color = 'red';
        
    }


});
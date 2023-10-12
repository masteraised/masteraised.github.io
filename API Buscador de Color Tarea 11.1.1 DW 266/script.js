document.addEventListener('DOMContentLoaded', () => {
    const btnBuscar = document.getElementById('btnBuscar');
    const btnClear = document.getElementById('btnClear');
    const inputBuscar = document.getElementById('inputBuscar');
    const baseDiv = document.getElementById('baseDiv');
    const complementaryDiv = document.getElementById('complementaryDiv');
    const greyscaleDiv = document.getElementById('greyscaleDiv');

    // Funcion que se activa al hacer click en el boton buscar
    btnBuscar.addEventListener('click', () => {
        const consulta = inputBuscar.value.trim();
        searchColor(consulta);
    });

    // Funcion para que tambien se active la busqueda al presionar enter
    inputBuscar.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const consulta = inputBuscar.value.trim();
            searchColor(consulta);
        }
    });

    // Funcion para manejar el boton borrar
    btnClear.addEventListener('click', () => {
        inputBuscar.value = ''; // Limpia el input
        clearDivs(); // Limpia los divs
    });

    // Funcion para hacer el fetch
    function fetchData(url) {
        return fetch(url)
            .then((response) => response.json());
    }

    // Funcion para setear el background de cada div de acuerdo al color elegido por usuario
    function setDivBackground(div, hexColor) {
        div.style.backgroundColor = hexColor;
        div.innerHTML = `Copy this code to use this color: ${hexColor}`;
    }

    // Funcion para limpiar los divs
    function clearDivs() {
        baseDiv.style.backgroundColor = '';
        baseDiv.innerHTML = '';
        complementaryDiv.style.backgroundColor = '';
        complementaryDiv.innerHTML = '';
        greyscaleDiv.style.backgroundColor = '';
        greyscaleDiv.innerHTML = '';
    }

    //Funcion para realizar fetch con color elegido por usuario y llenar divs con los colores correspondientes
    function searchColor(consulta) {
        //Convertir input a minusculas para que funcione correctamente
        consulta = consulta.toLowerCase();
        
        const url = `https://cors-anywhere.herokuapp.com/https://color.serialif.com/${consulta}`;
        fetchData(url)
            .then((data) => {
                setDivBackground(baseDiv, data.base.hex.value);
                setDivBackground(complementaryDiv, data.complementary.hex.value);
                setDivBackground(greyscaleDiv, data.grayscale.hex.value);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                clearDivs(); // Limpia los divs
                alert('That color does not exist, please pick another one'); // Muestra mensaje de alerta
            });
    }
});


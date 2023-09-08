document.addEventListener('DOMContentLoaded', () => {
    const btnBuscar = document.getElementById('searchButton');
    const userInput = document.getElementById('userInput');
    const divCont = document.getElementById('contenedor')
    const btnClear = document.getElementById('btnClear');

    // Funcion que se activa al hacer click en el boton buscar
    btnBuscar.addEventListener('click', () => {
        const consulta = userInput.value.trim();
        searchPokemon(consulta);
        clearDivs();
    });

    // Funcion para que tambien se active la busqueda al presionar enter
    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const consulta = userInput.value.trim();
            searchPokemon(consulta);
            clearDivs();
        }
    });

    // Funcion para hacer el fetch
    function fetchData(url) {
        return fetch(url)
            .then((response) => response.json());
    }

    // Funcion para manejar el boton borrar
    btnClear.addEventListener('click', () => {
        userInput.value = ''; // Limpia el input
        clearDivs(); // Limpia los divs
    });

    // Funcion para limpiar los divs
    function clearDivs() {
        divCont.innerHTML= '';
        
    }


    //Funcion para realizar fetch con color elegido por usuario y llenar divs con los colores correspondientes
    function searchPokemon(consulta) {
        //Convertir input a minusculas para que funcione correctamente
        consulta = consulta.toLowerCase();

        const url = `https://pokeapi.co/api/v2/pokemon/${consulta}`;
        fetchData(url)
            .then((data) => {
                console.log(data);
                divCont.innerHTML += `<img src="${data.sprites.front_shiny}" alt="Imagen frontal Shiny"></img>`
                divCont.innerHTML += `<p class='text-success text-light'>Nombre: ${data.forms[0].name}<p> `
                divCont.innerHTML += `<p class='text-success text-light'>Tipo: ${data.types[0].type.name}<p>` 
                divCont.innerHTML += `<p class='text-success text-light'>HP: ${data.stats[0].base_stat}<p>` 
                divCont.innerHTML += `<p class='text-success text-light'>Ataque: ${data.stats[1].base_stat}<p>` 
                divCont.innerHTML += `<p class='text-success text-light'>Defensa: ${data.stats[2].base_stat}<p>` 
                divCont.innerHTML += `<p class='text-success text-light'>Ataque Especial: ${data.stats[3].base_stat}<p>` 
                divCont.innerHTML += `<p class='text-success text-light'>Defensa Especial: ${data.stats[4].base_stat}<p>` 
                divCont.innerHTML += `<p class='text-success text-light'>Velocidad: ${data.stats[5].base_stat}<p>` 
            
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                alert('That Pokemon does not exist, please pick another one'); // Muestra mensaje de alerta
            });
    }





});
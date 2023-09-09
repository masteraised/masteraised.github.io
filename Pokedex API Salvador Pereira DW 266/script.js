document.addEventListener('DOMContentLoaded', () => {
    const btnBuscar = document.getElementById('searchButton');
    const userInput = document.getElementById('userInput');
    const divCont = document.getElementById('contenedor');
    const btnClear = document.getElementById('btnClear');
    const suggestionList = document.getElementById('suggestionList');

    // Function to display suggestions
    function displaySuggestions(consulta) {
        // Clear the suggestion list
        suggestionList.innerHTML = '';

        // Hide the suggestion list if the input is empty
        if (userInput.value.trim() === '') {
            suggestionList.style.display = 'none';
            return;
        }

        // Create a new <ul> element
        const suggestionUl = document.createElement('ul');
        suggestionUl.className = 'list-group list-inline mx-auto justify-content-center';

        // Fetch a list of Pokémon names
        const url = 'https://pokeapi.co/api/v2/pokemon/?limit=1000';
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                data.results.forEach((pokemon) => {
                    const name = pokemon.name;
                    if (name.includes(consulta)) {
                        // Create a list item for each matching Pokémon name
                        const listItem = document.createElement('li');
                        listItem.textContent = name;
                        listItem.className = 'list-inline-item lista';
                        listItem.addEventListener('click', () => {
                            userInput.value = name;
                            suggestionList.style.display = 'none';
                        });
                        suggestionUl.appendChild(listItem);
                    }
                });

                // Append the <ul> to the suggestion list if there are suggestions
                if (suggestionUl.childElementCount > 0) {
                    suggestionList.appendChild(suggestionUl);
                    suggestionList.style.display = 'block';
                } else {
                    suggestionList.style.display = 'none';
                }
            })
            .catch((error) => {
                console.error('Error fetching suggestions:', error);
            });
    }

    // Event listener for user input changes
    userInput.addEventListener('input', () => {
        const consulta = userInput.value.trim();
        displaySuggestions(consulta);
    });

    // Funcion para limpiar divs
    function clearDivs() {
        divCont.innerHTML = '';
    }

    // Event listener for the clear button
    btnClear.addEventListener('click', () => {
        userInput.value = '';
        clearDivs();
        suggestionList.style.display = 'none';
    });

    // Funcion para fetch y mostrar data de Pokemon
    function searchPokemon(consulta) {
        consulta = consulta.toLowerCase();
        const url = `https://pokeapi.co/api/v2/pokemon/${consulta}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const html = `
                    <img src="${data.sprites.front_default}" alt="Imagen frontal Shiny">
                    <p class='text-success text-light'>Nombre: ${data.forms[0].name}</p>
                    <p class='text-success text-light'>Tipo: ${data.types[0].type.name}</p>
                    <p class='text-success text-light'>HP: ${data.stats[0].base_stat}</p>
                    <p class='text-success text-light'>Ataque: ${data.stats[1].base_stat}</p>
                    <p class='text-success text-light'>Defensa: ${data.stats[2].base_stat}</p>
                    <p class='text-success text-light'>Ataque Especial: ${data.stats[3].base_stat}</p>
                    <p class='text-success text-light'>Defensa Especial: ${data.stats[4].base_stat}</p>
                    <p class='text-success text-light'>Velocidad: ${data.stats[5].base_stat}</p>
                `;
                divCont.innerHTML = html;
            })
            .catch((error) => {
                console.error('Error fetching Pokémon data:', error);
                alert('Ese Pokémon no existe, por favor elige otro');
            });
    }

    // Event listener para el boton de busqueda
    btnBuscar.addEventListener('click', () => {
        const consulta = userInput.value.trim();
        searchPokemon(consulta);
        clearDivs();
        suggestionList.style.display = 'none'; // Clear suggestions when performing a search
    });

    // Event listener para que tambien funcione al presionar ENTER o borrar (delete/backspace)
    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const consulta = userInput.value.trim();
            searchPokemon(consulta);
            clearDivs();
            suggestionList.style.display = 'none'; // Limpiar sugestiones al presionar enter
        } else if (event.key === 'Delete' || event.key === 'Backspace') {
            const consulta = userInput.value.trim();
            displaySuggestions(consulta);

            if (consulta === ' ') {
                suggestionList.style.display = 'none';
            }
        }
    });
});

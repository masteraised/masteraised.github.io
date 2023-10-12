document.addEventListener("DOMContentLoaded", function () {
  // Obtenemos referencias a elementos HTML
  const btnBuscar = document.getElementById("btnBuscar");
  const inputBuscar = document.getElementById("inputBuscar");
  const lista = document.getElementById("lista");
  const detallePelicula = new bootstrap.Offcanvas(
    document.getElementById("detallePelicula")
  ); // Contenedor superior de detalles de película
  const tituloPelicula = document.getElementById("tituloPelicula");
  const overviewPelicula = document.getElementById("overviewPelicula");
  const generosPelicula = document.getElementById("generosPelicula");
  const infoAdicional = document.getElementById("infoAdicional");
  const calificacionPelicula = document.getElementById("calificacionPelicula");
  const anioLanzamiento = document.getElementById("anioLanzamiento");
  const duracion = document.getElementById("duracion");
  const presupuesto = document.getElementById("presupuesto");
  const ganancias = document.getElementById("ganancias");

  let peliculas = []; // Almacenamos la lista de películas

  // Función para cargar las películas desde la API
  function cargarPeliculas() {
    fetch("https://japceibal.github.io/japflix_api/movies-data.json")
      .then((response) => response.json())
      .then((data) => {
        peliculas = data; // Almacenamos las películas cargadas en la variable peliculas
      })
      .catch((error) => {
        console.error("Error al cargar las películas:", error);
      });
  }

  // Función para mostrar las películas en la lista
  function mostrarPeliculas(peliculasMostrar) {
    lista.innerHTML = ""; // Limpiamos la lista antes de mostrar nuevas películas
    peliculasMostrar.forEach((pelicula) => {
      const li = document.createElement("li");
      li.classList.add("list-group-item");
      // Mostramos información de la película en la lista
      li.innerHTML = `
            <h5>${pelicula.title}</h5>
            <p>${pelicula.tagline}</p>
            <p>Rating: ${convertirCalificacionEnEstrellas(
              pelicula.vote_average
            )}</p>
          `;
      // Agregamos un evento de clic para mostrar detalles de la película
      li.addEventListener("click", () => mostrarDetalles(pelicula));
      lista.appendChild(li);
    });
  }

  // Función para mostrar los detalles de una película seleccionada
  function mostrarDetalles(pelicula) {
    detallePelicula.show(); // Mostramos el contenedor superior de detalles
    tituloPelicula.textContent = pelicula.title;
    overviewPelicula.textContent = pelicula.overview;
    generosPelicula.innerHTML = "";
    pelicula.genres.forEach((genero) => {
      const li = document.createElement("li");
      li.textContent = genero.name; // Mostrar el nombre del género
      generosPelicula.appendChild(li);
    });
    calificacionPelicula.innerHTML =
      "Calificación: " +
      convertirCalificacionEnEstrellas(pelicula.vote_average);

    anioLanzamiento.textContent = pelicula.release_date.split("-")[0];
    duracion.textContent = pelicula.runtime + " minutos";
    presupuesto.textContent = "$" + pelicula.budget.toLocaleString();
    ganancias.textContent = "$" + pelicula.revenue.toLocaleString();
  }
  // Función para convertir la calificación en formato de estrellas
  function convertirCalificacionEnEstrellas(calificacion) {
    const maxEstrellas = 5;
    const estrellasHTML = [];
    const calificacionRedondeada = Math.round(calificacion / 2);
    for (let i = 1; i <= maxEstrellas; i++) {
      if (i <= calificacionRedondeada) {
        estrellasHTML.push('<span class="estrella-amarilla">★</span>'); // Estrella amarilla
      } else {
        estrellasHTML.push('<span class="estrella-amarilla">☆</span>'); // Estrella amarilla vacía
      }
    }
    return estrellasHTML.join(" ");
  }

  // Evento de click en el botón de búsqueda
  btnBuscar.addEventListener("click", () => {
    const busqueda = inputBuscar.value.toLowerCase();
    if (busqueda) {
      const peliculasFiltradas = peliculas.filter((pelicula) => {
        const titulo = pelicula.title.toLowerCase();
        const generos = pelicula.genres
          .map((genero) => genero.name.toLowerCase())
          .join(", ");
        const tagline = pelicula.tagline.toLowerCase();
        const overview = pelicula.overview.toLowerCase();
        return (
          titulo.includes(busqueda) ||
          generos.includes(busqueda) ||
          tagline.includes(busqueda) ||
          overview.includes(busqueda)
        );
      });
      mostrarPeliculas(peliculasFiltradas); // Mostramos las películas filtradas
    } else {
      alert("Debe realizar una búsqueda"); // Mostramos una alerta si no ingresó nada en el campo de búsqueda
    }
  });

  cargarPeliculas(); // Cargar las películas al cargar la página
});

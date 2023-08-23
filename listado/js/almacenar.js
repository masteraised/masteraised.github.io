// Obtenemos los elementos a usar mediante dom
const inputItem = document.getElementById('item');
const btnAgregar = document.getElementById('agregar');
const btnLimpiar = document.getElementById('limpiar');
const contenedor = document.getElementById('contenedor');

// Obtiene el localStorage al cargar la pagina
window.addEventListener('load', () => {
  const items = JSON.parse(localStorage.getItem('items')) || [];
  mostrarItems(items);
});

// Agregar el elemento a la lista
btnAgregar.addEventListener('click', () => {
  const nuevoItem = inputItem.value.trim();
  if (nuevoItem !== '') {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    items.push(nuevoItem);
    localStorage.setItem('items', JSON.stringify(items));
    inputItem.value = '';
    mostrarItems(items);
  }
});

// Limpiar la lista y actualizamos
btnLimpiar.addEventListener('click', () => {
  localStorage.removeItem('items');
  mostrarItems([]);
});

// Función para mostrar los ítems en la vista
function mostrarItems(items) {
  contenedor.innerHTML = '';
  items.forEach(item => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = item;
    contenedor.appendChild(li);
  });
}

// Mostrar los ítems al cargar la página
mostrarItems(JSON.parse(localStorage.getItem('items')) || []);

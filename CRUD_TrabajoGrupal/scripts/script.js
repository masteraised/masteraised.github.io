// URL de la API
const url = "https://65427df9ad8044116ed37765.mockapi.io/users/";

// Botones y elementos del DOM
const searchButton = document.getElementById("btnGet1");
const addButton = document.getElementById("btnPost");
const putButton = document.getElementById("btnPut");
const deleteButton = document.getElementById("btnDelete");
const results = document.getElementById("results");
const inputGet = document.getElementById("inputGet1Id");
const inputPostNombre = document.getElementById("inputPostNombre");
const inputPostApellido = document.getElementById("inputPostApellido");
const inputPutId = document.getElementById("inputPutId");
const inputDeleteId = document.getElementById("inputDelete");

// Función para manejar las solicitudes a la API
let fetchJSONData = function (url, type) {
  let result = {};
  return fetch(url, type)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      return result;
    });
};


// Función para obtener y mostrar la lista de registros
function listAllUsers() {
  let type = {
    method: "GET",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };

  fetchJSONData(url, type).then(function (resultObj) {
    if (resultObj.status === "ok") {
      const users = resultObj.data;
      // Convierte la lista de registros a una cadena JSON
      const usersJSON = JSON.stringify(users, null, 2);
      // Muestra la lista en el elemento "results"
      results.innerHTML = `<pre>${usersJSON}</pre>`;
    } else {
      alert("Error al obtener la lista de registros.");
    }
  });
}

// PARTE 1: GET

searchButton.addEventListener("click", () => {
  const valor = inputGet.value;

  if (valor !== "") {
    // Si se ingresa un ID, muestra el registro correspondiente
    showData(valor);
  } else {
    // Si no se ingresa un ID, muestra la lista de todos los registros
    listAllUsers();
  }
});

// Función para mostrar un registro por ID
function showData(numero) {
  let type = {
    method: "GET",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };
  // Realiza la solicitud GET a la API y muestra el resultado en el contenedor "results"
  fetchJSONData(`${url}${numero}`, type).then(function (resultObj) {
    if (resultObj.status === "ok") {
      let users = resultObj.data;
      console.log(users);
      // Convierte los datos a una cadena JSON para mostrarlos en la pantalla
      const usersJSON = JSON.stringify(users, null, 2);

      // Establece el contenido HTML del elemento results
      results.innerHTML = `<pre>${usersJSON}</pre>`;
    }
  });
}

// PARTE 2: POST

// Agrega oyentes de eventos para los campos de entrada
inputPostNombre.addEventListener("input", toggleAddButton);
inputPostApellido.addEventListener("input", toggleAddButton);

// Función para habilitar o deshabilitar el botón "Agregar" según si los campos están completos
function toggleAddButton() {
  const name = inputPostNombre.value;
  const lastname = inputPostApellido.value;
  addButton.disabled = !(name !== "" && lastname !== "");
}

// Agrega un oyente de eventos al botón "Agregar"
addButton.addEventListener("click", () => {
  const name = inputPostNombre.value;
  const lastname = inputPostApellido.value;

  if (name !== "" && lastname !== "") {
    // Crea un objeto con los valores ingresados por el usuario
    const newUser = {
      name: name,
      lastname: lastname,
    };

    // Realiza una solicitud POST a la API para agregar el nuevo registro
    addNewUser(newUser);
  } else {
    alert("Por favor, complete todos los campos.");
  }
});

// Función para realizar una solicitud POST y agregar un nuevo registro
function addNewUser(newUser) {
  let type = {
    method: "POST",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify(newUser),
  };

  fetchJSONData(url, type).then(function (resultObj) {
    if (resultObj.status === "ok") {
      alert("Registro agregado con éxito.");

      // Limpia los campos de entrada
      inputPostNombre.value = "";
      inputPostApellido.value = "";

      // Obtiene la lista actualizada de registros y la muestra results
      listAllUsers();
    } else {
      alert("Error al agregar el registro.");
    }
  });
}



// Llama a la función para mostrar la lista de registros al cargar la página
listAllUsers();

// PARTE 3: PUT

// Agrega un oyente de eventos al campo de entrada inputPutId
inputPutId.addEventListener("input", togglePutButton);

// Función para habilitar o deshabilitar el botón "Modificar" según si se ingresó un ID válido
function togglePutButton() {
  const idToEdit = inputPutId.value;
  putButton.disabled = idToEdit === "";
}

// Agrega un oyente de eventos al botón "Modificar"
putButton.addEventListener("click", () => {
  const idToEdit = inputPutId.value;
  if (idToEdit !== "") {
    // Buscar el registro con el ID ingresado
    findUserById(idToEdit)
      .then((userToEdit) => {
        if (userToEdit) {
          // Verifica que los campos de nombre y apellido estén definidos antes de establecer los valores en el modal
          if (userToEdit.name !== undefined) {
            document.getElementById("inputEditNombre").value = userToEdit.name;
          }
          if (userToEdit.lastname !== undefined) {
            document.getElementById("inputEditApellido").value =
              userToEdit.lastname;
          }

          // Mostrar el modal de edición
          const editModal = new bootstrap.Modal(
            document.getElementById("editModal")
          );
          editModal.show();
        } else {
          alert("No se encontró un registro con el ID especificado.");
        }
      })
      .catch((error) => {
        console.error("Error al obtener el registro:", error);
      });
  } else {
    alert("Por favor, ingrese un ID válido para editar un registro.");
  }
});

// Agrega un oyente de eventos al botón "Guardar Cambios" en el modal de edición
const btnSaveChanges = document.getElementById("btnSaveChanges");
btnSaveChanges.addEventListener("click", () => {
  const name = document.getElementById("inputEditNombre").value;
  const lastname = document.getElementById("inputEditApellido").value;

  if (name !== "" && lastname !== "") {
    const idToEdit = inputPutId.value;
    const editedUser = {
      name: name,
      lastname: lastname,
    };

    // Realiza una solicitud PUT para actualizar el registro
    updateUserData(idToEdit, editedUser);
  } else {
    alert("Por favor, complete todos los campos en el modal de edición.");
  }
});
// Función para buscar un registro por ID
function findUserById(id) {
  let type = {
    method: "GET",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };

  return fetchJSONData(`${url}${id}`, type)
    .then(function (resultObj) {
      if (resultObj.status === "ok") {
        return resultObj.data;
      } else {
        return null;
      }
    })
    .catch(function (error) {
      return null;
    });
}

// Función para realizar una solicitud PUT y actualizar un registro
function updateUserData(id, editedData) {
  let type = {
    method: "PUT",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify(editedData),
  };

  fetchJSONData(`${url}${id}`, type).then(function (resultObj) {
    if (resultObj.status === "ok") {
      alert("Registro actualizado con éxito.");
      // Cierra el modal de edición
      const editModal = new bootstrap.Modal(
        document.getElementById("editModal")
      );
      editModal.hide();
      // Muestra la lista de registros actualizada
      listAllUsers();
    } else {
      alert("Error al actualizar el registro.");
    }
  });
}

// PARTE 4: DELETE

// Agrega un oyente de eventos al campo de entrada inputDeleteId
inputDeleteId.addEventListener("input", toggleDeleteButton);

// Función para habilitar o deshabilitar el botón "Borrar" según si se ingresó un ID válido
function toggleDeleteButton() {
  const idToDelete = inputDeleteId.value;
  deleteButton.disabled = idToDelete === "";
}

deleteButton.addEventListener("click", () => {
  const idToDelete = inputDeleteId.value;
  if (idToDelete !== "") {
    // Realizar una solicitud DELETE para eliminar el registro
    deleteUserData(idToDelete);
  } else {
    alert("Por favor, ingrese un ID válido para eliminar un registro.");
  }
});

function deleteUserData(id) {
  let type = {
    method: "DELETE",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };

  fetchJSONData(`${url}${id}`, type).then(function (resultObj) {
    if (resultObj.status === "ok") {
      alert("Registro eliminado con éxito.");
      // Obtener y mostrar la lista de registros actualizada
      listAllUsers();
    } else {
      alert("Error al eliminar el registro.");
    }
  });
}

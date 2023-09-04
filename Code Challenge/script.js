document.getElementById("formulario").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevenir el envio por default del boton
    
    // Obtener data del formulario
    const formData = new FormData(e.target);
    
    // Crear un objeto con la data ingresada
    const userData = {};
    formData.forEach((value, key) => {
      userData[key] = value;
    });
    
    // Enviar solicitud con POST al servidor
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from server:", data);
       
      })
      .catch((error) => {
        console.error("Error:", error);
       
      });
  });
    



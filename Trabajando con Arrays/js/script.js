// Array extraño
const strangeArray = [
  "Zero",
  function () {
    alert("Hola soy una función en un array");
  },
  22,
  null,
  "Go lang",
  undefined,
  "Cobol",
  "I'm programmer",
  -2000,
  "Hello world",
  `One is ${1}`,
  { name: "Info", lastname: "last info" },
  () => true,
  function showNumbers() {
    return "1, 2, 3, 4";
  },
  "Another String",
  ["Hola mundo!"],
  "b is a letter",
  "JavaScript",
];

// Función que recibe por parámetro un array y muestra sus elementos en pantalla

function showList(strangeArray) {
  const container = document.getElementById("list");
  container.innerHTML = "";
 
  //Filtro y ordenar array a solo string y ordeno alfabeticamente con sort
  const elementosString = strangeArray.filter((elemento) => typeof elemento === "string");
  elementosString.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  
  //Iteramos elementosString
  elementosString.forEach((elemento) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(elemento));
    container.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", (e) => {
  showList(strangeArray);
});


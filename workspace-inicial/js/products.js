// Funcion para hacer el fetch de la API
async function fetchProductData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
}

// Funcion para mostrar el producto en el HTML
function mostrarProduct(product) {
  const productCard = document.createElement("div");
  productCard.className = "list-group-item product-item d-flex justify-content-between align-items-center";
  productCard.innerHTML = `
    <div class="d-flex align-items-center">
      <img src="${product.image}" alt="${product.name}" style="width: 25%;" class="mr-3 product-image">
      <div style="width:100%;">
        <h5 style="margin-left: 5px;" class="fw-bold display-8 product-title">${product.name}</h5>
        <p style="margin-left: 5px;" class="product-price">${product.currency} ${product.cost}</p>
        <p style="margin-left: 5px;" class="product-description">${product.description}</p>
        <p style="margin-left: 5px;" class="text-end">${product.soldCount} vendidos</p>
      </div>
    </div>
  `;
  return productCard;
}

//Funcion principal que se ejecuta al terminar el DOM
async function main() {
  const productContainer = document.getElementById("product-list");

  const url = "https://japceibal.github.io/emercado-api/cats_products/101.json";
  const data = await fetchProductData(url);

  if (data) {
    data.products.forEach(product => {
      const productCard = mostrarProduct(product);
      productContainer.appendChild(productCard);
    });
  }
}

// Event listener para llamar la funcion principal cuando carga la pagina
document.addEventListener("DOMContentLoaded", main);

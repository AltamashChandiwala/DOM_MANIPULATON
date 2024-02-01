// Retrieve saved data from localStorage on page load
let products = JSON.parse(localStorage.getItem('products')) || [];

function renderProductList() {
  const contentSection = document.getElementById('content-section');
  contentSection.innerHTML = ''; 

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    const image = new Image();
    image.src = product.image; 
    image.alt = product.name;
    image.className = 'img-fluid';
    const productCardContent = document.createElement('div');
    productCardContent.className = 'product-card-content';
    productCardContent.innerHTML = `
      <h3>${product.name}</h3>
      <p>Category: ${product.category}</p>
      <p>Price: $${product.price}</p>
      <button class="btn btn-danger" onclick="deleteProduct('${product.name}')">Delete</button>
    `;
    card.appendChild(image);
    card.appendChild(productCardContent);
    contentSection.appendChild(card);
  });
}

function addProduct() {
  const imageInput = document.getElementById('product-image');
  const name = document.getElementById('product-name').value;
  const category = document.getElementById('product-category').value;
  const price = document.getElementById('product-price').value;


  if (!name || !category || isNaN(price) || !imageInput.files[0]) {
    alert('Please fill in all fields with valid data.');
    return;
  }

  const imageFile = imageInput.files[0];
  // Create a new product object
  const newProduct = {
    name,
    category,
    price: parseFloat(price),
    image: './image.jpeg', 
  };

  products.push(newProduct);
  localStorage.setItem('products', JSON.stringify(products));
  document.getElementById('product-form').reset();
  renderProductList();
}

function deleteProduct(productName) {
  const index = products.findIndex(product => product.name === productName);
  products.splice(index, 1);
  localStorage.setItem('products', JSON.stringify(products));
  renderProductList();
}
renderProductList();

// Dark mode and light mode toggle
let darkMode = false;

function toggleMode() {
  const bootstrapCssLink = document.getElementById('bootstrap-css');
  const bootswatchCssLink = document.getElementById('bootswatch-css');
  darkMode = !darkMode;

  if (darkMode) {
    bootstrapCssLink.href = 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css';
    bootswatchCssLink.href = 'https://stackpath.bootstrapcdn.com/bootswatch/4.5.2/darkly/bootstrap.min.css';
  } else {
    bootstrapCssLink.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css';
    bootswatchCssLink.href = 'https://bootswatch.com/4/superhero/bootstrap.min.css';
  }
}

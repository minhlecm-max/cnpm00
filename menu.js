function getTable() {
  return new URLSearchParams(location.search).get('table')
      || localStorage.getItem('table');
}

function getCart() {
  return JSON.parse(localStorage.getItem('cart_' + getTable()) || '[]');
}

function saveCart(cart) {
  localStorage.setItem('cart_' + getTable(), JSON.stringify(cart));
}

document.addEventListener('DOMContentLoaded', () => {
  const table = getTable();
  if (!table) {
    alert('Vui lòng quét QR');
    location.href = '/cnpm00/index.html';
    return;
  }

  localStorage.setItem('table', table);
  document.getElementById('table-number').innerText = table;
  document.getElementById('cart-link').href = `/cnpm00/cart.html?table=${table}`;

  renderMenu();
  updateCartCount();
});

function renderMenu() {
  const box = document.getElementById('menu-items-container');
  const cats = {};

  menu.forEach(i => (cats[i.category] ??= []).push(i));

  box.innerHTML = Object.keys(cats).map(cat => `
    <h3 class="mt-4">${cat}</h3>
    <div class="row">
      ${cats[cat].map(i => `
        <div class="col-6 col-md-3 mb-3">
          <div class="card h-100">
            <img src="${i.image}" class="card-img-top">
            <div class="card-body">
              <h6>${i.name}</h6>
              <b>${i.price.toLocaleString()}đ</b>
              <button class="btn btn-success w-100 mt-2"
                onclick="addToCart(${i.id})">Thêm</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `).join('');
}

function addToCart(id) {
  const item = menu.find(i => i.id === id);
  let cart = getCart();
  const found = cart.find(i => i.id === id);
  found ? found.qty++ : cart.push({ ...item, qty: 1 });
  saveCart(cart);
  updateCartCount();
}

function updateCartCount() {
  document.getElementById('cart-count').innerText =
    getCart().reduce((s, i) => s + i.qty, 0);
}

const table = new URLSearchParams(location.search).get('table');
document.getElementById('table').innerText = table;

const key = 'cart_' + table;
const cart = JSON.parse(localStorage.getItem(key) || '[]');

const box = document.getElementById('cart');
box.innerHTML = cart.map(i =>
  `<p>${i.name} × ${i.qty}</p>`
).join('');

function order() {
  alert('Đã gửi đơn cho bếp – Bàn ' + table);
  localStorage.removeItem(key);
  location.href = `/cnpm00/menu.html?table=${table}`;
}

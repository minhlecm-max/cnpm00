let orders = [];
let filter = "all";

function setFilter(f) {
  filter = f;
  render();
}

function loadOrders() {
  fetch("http://127.0.0.1:8000/orders")
    .then(r => r.json())
    .then(data => {
      orders = data;
      render();
    });
}

function updateStatus(id, status) {
  fetch(`http://127.0.0.1:8000/orders/${id}/${status}`, { method: "PUT" })
    .then(loadOrders);
}

function deleteOrder(id) {
  fetch(`http://127.0.0.1:8000/orders/${id}`, { method: "DELETE" })
    .then(loadOrders);
}

function render() {
  const box = document.getElementById("orders");
  box.innerHTML = "";

  orders
    .filter(o => filter === "all" || o.status === filter)
    .forEach(o => {
      const div = document.createElement("div");
      div.className = "order-card";
      div.innerHTML = `
        <h3>${o.food}</h3>
        <div>Số lượng: ${o.quantity}</div>
        <div>Bàn ${o.table} - ${o.customer}</div>
        <span class="badge">${o.status}</span>

        <div class="actions">
          <button class="btn-doing" onclick="updateStatus(${o.id}, 'doing')">Đang làm</button>
          <button class="btn-done" onclick="updateStatus(${o.id}, 'done')">Xong</button>
          <button class="btn-del" onclick="deleteOrder(${o.id})">Xóa</button>
        </div>
      `;
      box.appendChild(div);
    });
}

setInterval(loadOrders, 2000);
loadOrders();
const list = document.getElementById("order-list");

function renderOrders() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    list.innerHTML = "";

    orders.forEach(order => {
        const card = document.createElement("li");
        card.className = "order-card";

        card.innerHTML = `
          <h4>Bàn ${order.table}</h4>
          ${order.items.map(i => `<div>${i.name} × ${i.quantity}</div>`).join("")}
          <span class="status">${order.status}</span>

          <button onclick="setStatus(${order.id}, 'doing')">Đang làm</button>
          <button onclick="setStatus(${order.id}, 'done')">Xong</button>
        `;

        list.appendChild(card);
    });
}

function setStatus(id, status) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders = orders.map(o =>
        o.id === id ? { ...o, status } : o
    );
    localStorage.setItem("orders", JSON.stringify(orders));
    renderOrders();
}

renderOrders();
setInterval(renderOrders, 2000);

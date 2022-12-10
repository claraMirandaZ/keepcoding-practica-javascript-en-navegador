// 'use strict';
/* Constantes */
const savings = document.getElementById('savings');
// Otra forma const savings = document.querySelector('.js-savingsQty');
const income = document.getElementById('income');
const outcome = document.getElementById('outcome');
const list = document.getElementById('records');
const concept = document.getElementById('concept');
const amount = document.getElementById('amount');
const form = document.getElementById('transactions-form');

/* Variables */
let transactions = [];

/* Evento para añadir una transacción vía formulario */
form.addEventListener('submit', (ev) => {
  // Prevenir el evento submit del form
  ev.preventDefault();

  let transaction = {
    concept: concept.value,
    amount: +amount.value,
    // Podría hacerlo así id: Math.floor(Math.random() * 100000), o con una función:
    id: getId(),
  };
  // Añado transacciones al array con el método push
  transactions.push(transaction);
  // Guarda el array actualizado tras el push
  localStorage.setItem('transactionsHistory', JSON.stringify(transactions));

  addTransaction(transaction);
  updateBalance(transaction);

  concept.value = '';
  amount.value = '';
});

/* Generar una ID aleatoria */
function getId() {
  return Math.floor(Math.random() * 100000);
}

/* Actualizar balance */
function updateBalance() {
  // Método map para crear un array con las cantidades de las transacciones
  const amounts = transactions.map((transaction) => transaction.amount);
  // Método reduce para sumar los valores de las transacciones (total)
  // Balance = bal = dónde quiero acumular
  // value = qué quiero acumular
  const total = amounts.reduce((bal, value) => (bal += value), 0).toFixed(2);
  //  Suma de todos los ingresos (números positivos) del array amounts
  const earnings = amounts
    .filter((value) => value > 0)
    .reduce((bal, value) => (bal += value), 0)
    .toFixed(2);
  // Gastos (números negativos)
  const expenses = (
    amounts
      .filter((value) => value < 0)
      .reduce((bal, value) => (bal += value), 0) * -1
  ).toFixed(2);

  savings.innerHTML = `${total} €`;
  income.innerHTML = `${earnings} €`;
  outcome.innerHTML = `${expenses} €`;
}

/* Añadir transacción */
function addTransaction(transaction) {
  // Obetener el tipo de transacción por su signo
  // Si la cantidad es menor que cero, es negativa. Si es mayor que cero, positiva
  const sign = transaction.amount < 0 ? '-' : '+';
  // Variable para los elementos de la lista (ul)
  const elt = document.createElement('li');

  // Añadimos al elemento (li) una clase basada en su value
  elt.classList.add(transaction.amount < 0 ? 'negative' : 'positive');
  // Pintamos dentro de ese elemento (li) el número absoluto con su signo
  elt.innerHTML = `<i id="delete" role="button">❌</i> <span>${
    transaction.concept
  }</span>, <span>${sign}${Math.abs(transaction.amount).toFixed(2)}</span>`;

  // A nuestra lista (ul) le ponemos un elemento (li)
  list.appendChild(elt);

  // Listener del icono para eliminar transacción (usando su primer hijo, el i)
  elt.firstElementChild.addEventListener('click', () => {
    removeTransaction(transaction.id);
  });
}

/* Eliminar transacción */
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  // Guarda el array actualizado tras el filter
  localStorage.setItem('transactionsHistory', JSON.stringify(transactions));

  startApp();
}

/* Comprobar el localStorage */
function getInitialTransactions() {
  let localData = localStorage.getItem('transactionsHistory');
  // Si localData no es nulo
  if (localData) {
    // Devuelve el array guardado en localStorage como string
    return JSON.parse(localData);
  } else {
    return [];
  }
}

/* Inicializar app */
function startApp() {
  list.innerHTML = '';
  // Si hay algo guardado en localStorage, lo trae antes de
  transactions = getInitialTransactions();
  // pintarlo
  transactions.forEach(addTransaction);
  updateBalance();
}

startApp();

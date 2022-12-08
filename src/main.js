/* Variables */
const balance = document.getElementById('balance__qty');
const income = document.getElementById('income__qty');
const expense = document.getElementById('expenses__qty');
const list = document.getElementById('records');
const form = document.getElementById('transactions');
const transactions = document.getElementById('transactions');

/* Añadir transacción */
transactions.addEventListener('submit', (ev) => {
  // Prevenir el evento submit del form
  ev.preventDefault();

  const inputConcept = document.getElementById('concept');
  const inputAmount = document.getElementById('amount');

  let transaction = {
    concept: inputConcept.value,
    amount: +inputAmount.value,
  };
  transactions.push(transaction);

  inputConcept.value = '';
  inputAmount.value = '';
});

/* Actualizar balance */
/* Histórico */
/* Eliminar transacción */
/* Inicializar app */
/* Eventos */

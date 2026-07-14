const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionFormEl = document.getElementById("transaction-form");
const transactionListEl = document.getElementById("transaction-list");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

transactionFormEl.addEventListener("submit", addTransaction);

function addTransaction(e) {
  e.preventDefault();

  // form values
  const description = descriptionEl.value.trim();

  const amount = parseFloat(amountEl.value);

  transactions.push({
    id: Date.now(),
    description: description,
    amount: amount,
  });

  localStorage.setItem("transactions",JSON.stringify(transactions))

  updateTransactionList()
  updateSummary()

  transactionFormEl.reset()
}

function updateTransactionList(){
  transactionFormEl.innerHTML = ""
  const sortedTransactions = [...transactions].reverse()

  sortedTransactions.forEach((transaction)=>{
    const transactionEl = createTransactionEl(transaction)
    transactionListEl.appendChild(transactionEl)
  })

}


function createTransactionEl(transaction){
  const li = document.createElement("li")
  li.classList.add("transaction")
  li.classList.add(transaction.amount>0?"income":"expense")

  // todo: update the amount formatting
  li.innerHTML = `
  <span>${transaction.description}</span>
  <span>${formatCurrency(transaction.amount)}
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X<button>
  </span>
  `
  return li
}

function updateSummary(){
  const balance = transactions.reduce((acc,transaction)=> acc + transaction.amount ,0)

  const income = transactions.filter(transaction => transaction.amount >0).reduce((acc,transaction)=> acc + transaction.amount ,0)
  const  expense = transactions.filter(transaction => transaction.amount <0).reduce((acc,transaction)=> acc + transaction.amount ,0)
  
  balanceEl.textContent = formatCurrency(balance)
  incomeAmountEl.textContent = formatCurrency(income)
  expenseAmountEl.textContent = formatCurrency(expense)
}

function formatCurrency(number){
  return new Intl.NumberFormat("en-US",{
    style:"currency",
    currency:"USD",
  }).format(number)
}

// initial render
updateTransactionList()
updateSummary()
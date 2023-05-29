// Store budget and expenses
let monthlyBudget = 0;
let expenses = [];

// Get DOM elements
const budgetInput = document.getElementById("budget-input");
const addBudgetBtn = document.getElementById("add-budget-btn");
const currency = document.getElementById("currency");
const budgetErrorMessage = document.getElementById("budgetErrorMessage");
const addExpenseBtn = document.getElementById("add-expense-btn");
const categoryInput = document.getElementById("category-input");
const amountInput = document.getElementById("amount-input");
const dateInput = document.getElementById("date-input");
const expensesErrorMessage = document.getElementById("expensesErrorMessage");
const totalBudget = document.getElementById("totalBudget");
const allExpenses = document.getElementById("allExpenses");
const totalBalance = document.getElementById("totalBalance");
const expensesListBody = document.getElementById("expenses-list-body");

// Event listeners
addBudgetBtn.addEventListener("click", addBudget);
addExpenseBtn.addEventListener("click", addExpense);
expensesListBody.addEventListener("click", deleteExpense);
expensesListBody.addEventListener("click", editExpense);

// Add monthly budget
function addBudget(e) {
  e.preventDefault();
  const budget = parseFloat(budgetInput.value);

  if (!isNaN(budget) && budget > 0) {
    monthlyBudget = budget;
    totalBudget.textContent = `${currency.value} ${monthlyBudget}`;
    totalBalance.textContent = `${currency.value} ${monthlyBudget}`;
    budgetInput.value = "";
  }else {
    budgetErrorMessage.classList.remove("hide");
  } setTimeout(() => {
    budgetErrorMessage.classList.add("hide");
  }, 2000);
  return false;
};

// Add expense
function addExpense(e) {
  e.preventDefault();
  if (!categoryInput.value || !amountInput.value || !dateInput.value) {
    expensesErrorMessage.classList.remove("hide");
    setTimeout(() => {
      expensesErrorMessage.classList.add("hide");
    }, 2000);
    return false;
  };

  const category = categoryInput.value;
  const amount = parseFloat(amountInput.value);
  const date = dateInput.value;

  const expense = {
    category,
    amount,
    date
  };

  expenses.push(expense);
  displayExpenses();
  updateTotalBalance();
  updateExpenses();
  clearExpense();
};

// Delete Expenses in the table
function deleteExpense(e) {
  if (e.target.id === "deleteBtn") {
    const expenseItem = e.target.closest("th");
    const expenseIndex = Array.from(expensesListBody.children).indexOf(expenseItem); 
    expenses.splice(expenseIndex, 1);
    allExpenses.textContent = "0";
    totalBalance.textContent = `${currency.value} ${monthlyBudget}`;
    displayExpenses();
    updateTotalBalance();
    updateExpenses();
  };
};

// Display expenses in the table
function displayExpenses() {
  expensesListBody.innerHTML = "";
  expenses.forEach(expense => {
    const row = document.createElement("th");
    row.innerHTML = `
      <span class="category">${expense.category}</span>
      <span class="amount">${currency.value} ${expense.amount}</span>
      <span class="date">${expense.date}</span>
      <div class="fa-solid fa-pen-to-square" id="editBtn"></div>
      <button class="fa-solid fa-xmark" id="deleteBtn"></button>
    `;
    expensesListBody.appendChild(row);
  });
};

// UpdateExpenses
function updateExpenses() {
  const addExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  if (addExpenses > 0) {
    const fullExpenses = addExpenses;
    allExpenses.textContent = `${currency.value} ${fullExpenses}`;
  }else {
    addExpenses = "";
  };
};

// Update remaining budget
function updateTotalBalance() {
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  if (totalExpenses > 0) {
    const remaining = monthlyBudget - totalExpenses;
    totalBalance.textContent = `${currency.value} ${remaining}`;
  }else {
    totalExpenses = "";
  };
};

// Clear expense form
function clearExpense() {
  categoryInput.value = "";
  amountInput.value = "";
  dateInput.value = "";
};

// Edit expense
function editExpense(e) {
  if (e.target.id === "editBtn") {
    const expenseItem = e.target.closest("th");
    const expenseIndex = Array.from(expensesListBody.children).indexOf(expenseItem);
    const expense = expenses[expenseIndex];

    categoryInput.value = expense.category;
    amountInput.value = expense.amount;
    dateInput.value = expense.date;

    expenses.splice(expenseIndex, 1);
    allExpenses.textContent = "0";
    totalBalance.textContent = `${currency.value} ${monthlyBudget}`;

    displayExpenses();
    updateTotalBalance();
    updateExpenses();
  };
};
//map() – Transforming Each Element to Create a New Array

let priceUSD = [20, 35, 13];

// Multiply each USD value by 83 (exchange rate) to get INR
let priceINR = priceUSD.map(x => x * 83);
console.log(priceINR); // 👉 [1660, 2905, 1079]
//===============================================

function convert(val) {
    return val * 83;
}

priceINR = priceUSD.map(convert);
console.log(priceINR); // 👉 same result
//===============================================

const input = [
    { name: 'John', age: 15 },
    { name: 'Radha', age: 45 },
    { name: 'Kaushik', age: 12 },
    { name: 'Anu', age: 21 },
    { name: 'Divya', age: 26 }
];

// Extract just the ages into a new array
const ages = input.map(x => x.age);
console.log(ages); // 👉 [15, 45, 12, 21, 26]



//filter() – Selecting Specific Elements Based on Condition

let cost = [35, 234, 12, 34, 54, 123];

let lessThan100 = cost.filter(x => x < 100);
console.log(lessThan100); // 👉 [35, 12, 34, 54]
//===============================================

const users = [
    { name: "Akash", active: true },
    { name: "Neha", active: false },
    { name: "Ravi", active: true },
    { name: "Priya", active: false }
];

const activeUsers = users.filter(user => user.active);

console.log(activeUsers);
//===============================================
const products = [
    { name: "Laptop", inStock: true },
    { name: "Mouse", inStock: false },
    { name: "Keyboard", inStock: true }
];

const availableProducts = products.filter(p => p.inStock);

console.log(availableProducts);
//===============================================

const transactions = [250, 890, 1200, 5000, 600];

const highValueTxns = transactions.filter(amount => amount > 1000);

console.log(highValueTxns); // 👉 [1200, 5000]


//===============================================
//reduce() – Combine All Elements into One Value


const cart = [
    { item: "T-shirt", price: 500 },
    { item: "Shoes", price: 1500 },
    { item: "Watch", price: 2500 }
];

// Use reduce to calculate total price
const totalAmount = cart.reduce((total, product) => total + product.price, 0);

console.log(`🛒 Total Cart Value: ₹${totalAmount}`); // 👉 ₹4500



//===============================================
const expenses = [
    { category: "food",  amount:  450 },
    { category: "travel",amount: 1200 },
    { category: "food",  amount:  300 },
    { category: "rent",  amount: 8000 },
    { category: "travel",amount:  600 }
  ];
  
  // reduce → build an object whose keys are categories
  const totalsByCategory = expenses.reduce((acc, txn) => {
    acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
    return acc;
  }, {});
  
  console.log(totalsByCategory);
  // 👉 { food: 750, travel: 1800, rent: 8000 }
  //Budgeting tools, bookkeeping software, and corporate expense trackers all need this “bucket and sum” pattern.

//   🔍 Example in action:
//   Suppose this is the first transaction:
  

//   { category: "food", amount: 450 }
//   acc["food"] doesn’t exist yet → it's undefined
  
//   So (acc["food"] || 0) becomes 0
  
//   Then: 0 + 450 = 450
  
//   Now acc = { food: 450 }
  
//   On the next transaction:
  

//   { category: "food", amount: 300 }
//   acc["food"] is now 450
  
//   So 450 + 300 = 750
  
//   Now acc = { food: 750 }

//acc["food"] = (450 || 0) + 300; // → 750

//forEach() – Looping Over Arrays

const fruits = ["apple", "banana", "cherry"];

fruits.forEach(function(fruit, index) {
  console.log(index + ": " + fruit);
});

fruits.forEach((fruit) => console.log(fruit.toUpperCase()));

//===============================================
const users = [
    { name: "Alice", email: "alice@example.com" },
    { name: "Bob", email: "bob@example.com" }
  ];
  
  users.forEach(user => {
    // This could be inserted into the DOM in real apps
    console.log(`${user.name} - ${user.email}`);
  });

//===============================================
const customers = ["john@example.com", "mary@example.com"];

// Simulated email sending function
function sendEmail(email) {
  console.log(`📧 Sending email to ${email}...`);
  // In real world: this would use an API like SendGrid, Mailchimp, etc.
  // Example: sendgrid.send({ to: email, subject: "...", body: "..." })
}
 
// Loop through all customers and send them emails
customers.forEach(email => {
  sendEmail(email); // Callback to sendEmail
});

//===============================================





// A callback function is a function that is passed as an argument to another function and is executed later.


function registerUser(name, callback) {
    console.log(`👤 Registering ${name}...`);
    callback(name); // Once done, do next step
  }
  
  function sendWelcomeEmail(user) {
    console.log(`📧 Sending welcome email to ${user}`);
  }
  
  registerUser("Akash", sendWelcomeEmail);
  
  
//===============================================
  function calculateTotal(cart, callback) {
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    callback(total);
  }
  
  function applyDiscount(amount) {
    let final = amount * 0.9; // 10% discount
    console.log(`💵 Final price after discount: ₹${final}`);
  }
  
  const cartItems = [{ price: 200 }, { price: 150 }];
  calculateTotal(cartItems, applyDiscount);
  //===============================================
  function showMessageLater(callback) {
    setTimeout(() => {
      callback("Hello after 2 seconds!");
    }, 2000);
  }
  
  function printMessage(msg) {
    console.log("⏳ Message:", msg);
  }
  
  showMessageLater(printMessage);








// Crypto wallets deal with extremely large numbers (e.g., Wei in Ethereum)
const walletBalance = BigInt("1000000000000000000000000000000");

const tokenPrice = BigInt("5000000000000000000"); // 5 ETH in Wei

const tokensYouCanBuy = walletBalance / tokenPrice;

console.log("🪙 Tokens:", tokensYouCanBuy); // BigInt division, no precision loss


// JavaScript's normal Number maxes out at 9007199254740991 (safe integer limit)

// Big financial systems, cryptographic hashes, or databases use BigInt to avoid overflow


// A closure is:

// A function that remembers the variables from the outer scope where it was defined, even after that outer function has finished running.
function amma(name) {
    let snack = "apple";
  
    function paiyan() {
      console.log("🍎 Bag-la irundha snack:", snack);
      console.log("👕 Name tag from amma:", name);
    }
  
    return paiyan;
  }
  
  const schoolTrip = amma("Akash");
  schoolTrip(); // 🎒 Still uses snack and name from bag
  

// myFunc remembers outerVariable and name even though outer() has finished running.





  function createTicketCounter() {
    let count = 0; // 🔒 private variable
  
    return function generateTicket(customerName) {
      count++;
      return `🎟️ Ticket #${count} for ${customerName}`;
    };
  }
  
  // Create a booking system
  const bookTicket = createTicketCounter();
  
  console.log(bookTicket("Alice")); // 🎟️ Ticket #1 for Alice
  console.log(bookTicket("Bob"));   // 🎟️ Ticket #2 for Bob
  console.log(bookTicket("Charlie")); // 🎟️ Ticket #3 for Charlie
  
//   createTicketCounter() runs once and sets up a count variable.

//   It returns the generateTicket() function, which remembers the count variable — that’s the closure.
  
//   Each call to bookTicket() increments and uses that private counter.
  
  



//async vs sync

console.log("🧑 Ordering dosa");
console.log("🍽️ Eating dosa");
console.log("☕ Then order coffee");



console.log("🧑 Ordered dosa (cooking...)");

setTimeout(() => {
  console.log("🍽️ Dosa ready!");
}, 2000);

console.log("☕ In the meantime, you order coffee");


//promises
let parcel = new Promise((resolve, reject) => {
    let isDelivered = true;
  
    if (isDelivered) {
      resolve("🎉 Biriyani delivered!");
    } else {
      reject("😢 Order cancelled!");
    }
  });
  
  parcel
    .then(msg => console.log(msg))     // Runs if resolve()
    .catch(err => console.log(err));   // Runs if reject()
  

    //=========

    function loginUser(username, password) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // Simulating backend check
            if (username === "akash" && password === "1234") {
              resolve("✅ Login successful! Welcome, Akash");
            } else {
              reject("❌ Login failed: Invalid credentials");
            }
          }, 2000); // 2 seconds delay to mimic real API
        });
      }
      
      console.log("🔐 Trying to login...");
      
      loginUser("akash", "1234")
        .then((message) => {
          console.log(message); // when resolve() runs
        })
        .catch((error) => {
          console.log(error);   // when reject() runs
        });
      



        //====
        // ✅ Simulate login API
function loginUser(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "akash@example.com" && password === "1234") {
          resolve("🔓 Login successful");
        } else {
          reject("❌ Invalid credentials");
        }
      }, 1000);
    });
  }
  
  // ✅ Simulate fetching orders from backend
  function fetchOrders() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(["📦 Order #1", "📦 Order #2", "📦 Order #3"]);
      }, 2000);
    });
  }
  
  // ✅ Use async/await to handle them sequentially
  async function loadDashboard() {
    try {
      console.log("🔐 Logging in...");
      const loginStatus = await loginUser("akash@example.com", "1234");
      console.log(loginStatus);
  
      console.log("📡 Fetching orders...");
      const orders = await fetchOrders();
      console.log("🧾 Your Orders:", orders);
    } catch (error) {
      console.log("⚠️ Error:", error);
    }
  }
  
  loadDashboard();
  
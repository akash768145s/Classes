// Example: JavaScript Synchronous Error
let user = null;

try {
    console.log(user.name); // ❌ TypeError
} catch (err) {
    console.error("Caught error:", err.message);
}

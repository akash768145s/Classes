// =======================
// 🎒 var – Old locker
// =======================

console.log("=== VAR Example ===");

var subject = "Math";//1
console.log("Initial subject:", subject); // Math

var subject = "Science"; // Re-declared without error
console.log("Re-declared subject:", subject); // Science

subject = "History"; // Reassigned
console.log("Reassigned subject:", subject); // History

function varScopeTest() {
    var score = 90;
    console.log("Inside function:", score);
}

varScopeTest();
// console.log(score); // ❌ Error: score is not defined outside function (var is function-scoped)


// =======================
// 👦 let – Modern locker
// =======================

console.log("\n=== LET Example ===");

let drink = "Water";
console.log("Initial drink:", drink); // Water

// let drink = "Juice"; // ❌ Error: Cannot redeclare
drink = "Juice"; // ✅ Can reassign
console.log("Reassigned drink:", drink); // Juice

{
    let snack = "Chips";
    console.log("Inside block:", snack); // Chips
}
// console.log(snack); // ❌ Error: snack is block-scoped


// =======================
// 🧑‍🎓 const – Locked locker
// =======================

console.log("\n=== CONST Example ===");

const hallTicket = "2025ABC";
console.log("Hall Ticket:", hallTicket); // 2025ABC

// hallTicket = "2026XYZ"; // ❌ Error: Cannot reassign
// \\const hallTicket = "New"; // ❌ Error: Cannot redeclare

const student = {
    name: "Akash",
    age: 22
};

console.log("Student name:", student.name); // Akash

// You can't reassign the student object itself:
// student = {}; // ❌ Error

// But you CAN change its properties:
student.age = 23; // ✅ Allowed
console.log("Updated age:", student.age); // 23

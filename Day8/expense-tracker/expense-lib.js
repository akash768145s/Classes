const fs=require("fs");
const path=require("path");

const EXPENSE_FILE=path.join(__dirname,"expenses.json");

function load(){
    try{
        return JSON.parse(fs.readFileSync(EXPENSE_FILE,"utf-8"));
    }catch(err){
        return [];
    }
}


function save(expenses){
    fs.writeFileSync(EXPENSE_FILE,JSON.stringify(expenses));
}

function nextId(expenses){
    return expenses.length>0?Math.max(...expenses.map(e=>e.id))+1:1;
}

exports.add=function(description,amount){
    const expenses=load();
    const id=nextId(expenses);
    const Date=new Date().toISOString().slice(0,10)
    expenses.push({id,date,description,amount});
    save(expenses);

}



// ✏️ Update existing expense
exports.update = function (id, description, amount) {
    const expenses = load();
    const idx = expenses.findIndex(e => e.id === id); // id match check

    if (idx === -1) {
        console.log('Expense not found.');
        return;
    }

    // description kuduthaa update pannum
    if (description) expenses[idx].description = description;

    // amount valid-a irundha update pannum
    if (!isNaN(amount) && amount > 0) expenses[idx].amount = amount;

    save(expenses); // update file
    console.log('Expense updated successfully.');
};

// ❌ Expense delete panna
exports.del = function (id) {
    const expenses = load();
    const idx = expenses.findIndex(e => e.id === id);

    if (idx === -1) {
        console.log('Expense not found.');
        return;
    }

    expenses.splice(idx, 1); // andha index-a remove pannrom
    save(expenses);
    console.log('Expense deleted successfully');
};

// 📃 Expense list print panna
exports.list = function () {
    const expenses = load();

    if (!expenses.length) {
        console.log('No expenses.');
        return;
    }

    // heading print
    console.log('ID  Date        Description        Amount');

    // ella expense-um oru line la print pannrom
    expenses.forEach(e => {
        console.log(`${e.id}   ${e.date}  ${e.description.padEnd(16)}  $${e.amount}`);
    });
};

// 📆 Monthly / total summary kaami pannum
exports.summary = function (month) {
    const expenses = load();
    let filtered = expenses;
    let label = 'Total expenses';

    if (month) {
        const m = String(month).padStart(2, '0');
        const year = new Date().getFullYear();

        // andha month-ku match aana expenses mattum filter pannrom
        filtered = expenses.filter(e => e.date.startsWith(`${year}-${m}`));

        // label change pannrom
        label += ` for ${new Date(year, month - 1).toLocaleString('default', { month: 'long' })}`;
    }

    // total amount calculate pannrom
    const total = filtered.reduce((sum, e) => sum + e.amount, 0);

    console.log(`${label}: $${total}`);
};

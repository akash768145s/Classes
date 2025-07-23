// fs = file system module import panrom – file read/write panna use pannuvom
const fs = require('fs');

// path module use panni file path correct-a build panrom
const path = require('path');

// __dirname = current folder; adhula expenses.json file store panrom
const EXPENSES_FILE = path.join(__dirname, 'expenses.json');

// 🔄 Load function – existing expenses file read pannum
function load() {
    try {
        // File irundha JSON read panni object-a return pannum
        return JSON.parse(fs.readFileSync(EXPENSES_FILE, 'utf8'));
    } catch {
        // File illa-na empty array return pannum
        return [];
    }
}

// 💾 Save function – expenses object-a JSON string-a maathi save pannum
function save(expenses) {
    fs.writeFileSync(EXPENSES_FILE, JSON.stringify(expenses, null, 2));
}

// 📊 nextId – next expense-ku ID generate pannum (auto-increment)
function nextId(expenses) {
    return expenses.length ? Math.max(...expenses.map(e => e.id)) + 1 : 1;
}

// ➕ Expense add panna
exports.add = function (description, amount) {
    const expenses = load(); // old data load
    const id = nextId(expenses); // pudhu ID
    const date = new Date().toISOString().slice(0, 10); // today date (YYYY-MM-DD format)

    // pudhu expense object create pannrom
    expenses.push({ id, date, description, amount });

    save(expenses); // save file-la
    console.log(`Expense added successfully (ID: ${id})`);
};

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

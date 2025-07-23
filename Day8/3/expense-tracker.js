// Usage examples:
// node expense-tracker.js add --description "Lunch" --amount 20
// node expense-tracker.js update --id 1 --description "Brunch" --amount 25
// node expense-tracker.js delete --id 1
// node expense-tracker.js list
// node expense-tracker.js summary
// node expense-tracker.js summary --month 8

// 👉 Expense library import pannrom – athula functions irukku
const tracker = require('./expenseTrackerLib');

// ✅ process.argv = terminal-la type pannadhu full array
// [0] = node path, [1] = file name, [2+] = namma kudukkura arguments
const args = process.argv.slice(2);  // user input-a slice panrom
const cmd = args[0]; // first argument = command like add, list, delete etc.

// 🧠 Helper function – flags like --amount, --description-ku value edukkum
function getArg(flag) {
    const idx = args.indexOf(flag); // flag enga irukku-nu check
    if (idx !== -1 && idx + 1 < args.length) return args[idx + 1]; // next value return
    return undefined; // illa-na undefined
}

// 🔄 switch statement – user command based on execute pannrom
switch (cmd) {
    case 'add': {
        const description = getArg('--description'); // example: --description "Tea"
        const amount = Number(getArg('--amount'));   // example: --amount 15

        // ✅ Validate input
        if (!description || isNaN(amount) || amount <= 0) {
            console.log('Usage: add --description <desc> --amount <amt>');
            process.exit(1); // ❌ error-na exit
        }

        tracker.add(description, amount); // 🎯 Expense add
        break;
    }

    case 'update': {
        const id = Number(getArg('--id')); // --id 1
        const description = getArg('--description'); // optional
        const amount = Number(getArg('--amount'));   // optional

        // ✅ Check at least id + one field
        if (!id || (!description && isNaN(amount))) {
            console.log('Usage: update --id <id> [--description <desc>] [--amount <amt>]');
            process.exit(1);
        }

        tracker.update(id, description, amount); // 🎯 Expense update
        break;
    }

    case 'delete': {
        const id = Number(getArg('--id'));
        if (!id) {
            console.log('Usage: delete --id <id>');
            process.exit(1);
        }

        tracker.del(id); // ❌ Expense delete
        break;
    }

    case 'list':
        tracker.list(); // 📄 All expenses list
        break;

    case 'summary': {
        const month = getArg('--month'); // optional month
        tracker.summary(month ? Number(month) : undefined); // 📆 Summary show
        break;
    }

    default:
        console.log('Commands: add, update, delete, list, summary');
        console.log('See usage at top of file.');
}

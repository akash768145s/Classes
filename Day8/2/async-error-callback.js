// fs module import panrom – file system work panna use pannuvom
const fs = require('fs');

// Ippo oru file read panna try panrom – aana andha file real-a illa
// So idhu async operation – callback use pannrom
fs.readFile('nonexistent.txt', 'utf8', (err, data) => {

    // Error irundhaa (file illa-na), indha block work aagum
    if (err) {
        // Error message ah console la print panrom
        console.error('Async error caught using callback:', err.message);
    } else {
        // File irundhaa data kedachudum – adha print panrom
        console.log(data);
    }
});

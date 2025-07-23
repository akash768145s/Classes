// Step 1: Import the 'events' module (built-in Node.js module)
const EventEmitter = require('events');

// Step 2: Create a new EventEmitter object (like installing a doorbell)
const emitter = new EventEmitter();

// Step 3: Listen for a custom event called 'doorbell'
// This is like setting up a listener: "If someone rings the bell, do this"
emitter.on('doorbell', () => {
    console.log('Someone rang the doorbell!');
});

// Step 4: Emit (trigger) the 'doorbell' event
// This is like someone actually pressing the doorbell
emitter.emit('doorbell'); // Output: Someone rang the doorbell!

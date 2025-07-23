// Step 1: Import events module
const EventEmitter = require('events');

// Step 2: Create an emitter instance
const orderEmitter = new EventEmitter();

// Step 3: Listen for 'orderPlaced' event
orderEmitter.on('orderPlaced', (order) => {
    console.log(`🛒 Order received for: ${order.item}`);
    console.log('👨‍🍳 Cooking started...');
});

// Step 4: Listen for 'orderReady' event
orderEmitter.on('orderReady', (order) => {
    console.log(`✅ Order ready for: ${order.item}`);
    console.log('📦 Packing the food...');
});

// Step 5: Listen for 'orderDelivered' event
orderEmitter.on('orderDelivered', (order) => {
    console.log(`🚚 Order delivered to: ${order.customer}`);
});

// Step 6: Emit events (like real-time tracking)
const order = { item: 'Dosa', customer: 'Ravi' };

orderEmitter.emit('orderPlaced', order);
orderEmitter.emit('orderReady', order);
orderEmitter.emit('orderDelivered', order);

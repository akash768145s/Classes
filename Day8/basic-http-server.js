// Usage: node basic-http-server.js
// Then visit: http://localhost:3000/ or http://localhost:3000/about

// Step 1: Import the built-in 'http' module to create an HTTP server
const http = require('http');

// Step 2: Create the server using http.createServer()
// This takes a callback function with two arguments:
// req = request object (from client), res = response object (to send back)
const server = http.createServer((req, res) => {

    // Check if the request is for the home page ("/") and method is GET
    if (req.url === '/' && req.method === 'GET') {
 
        res.writeHead(200, { 'Content-Type': 'text/html' }); // 200 = OK
        res.end('<h1>Home Page</h1><p>Welcome to the basic HTTP server!</p>');

        // Check if the request is for the /about page
    } else if (req.url === '/about' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>About</h1><p>This is a simple Node.js HTTP server.</p>');

        // If request URL is anything else → return 404
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' }); // 404 = Not Found
        res.end('<h1>404 Not Found</h1><p>The page you requested does not exist.</p>');
    }
});

// Step 3: Set the port number (can be anything, here it's 3000)
const PORT = 3000;

// Step 4: Start the server and make it listen on PORT 3000
server.listen(PORT, () => {
    // Log message to know server is running
    console.log(`Server running at http://localhost:${PORT}/`);
});

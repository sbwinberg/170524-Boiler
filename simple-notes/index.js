const fs = require('fs');
const http = require('http');

const displayNotes = fs.readFileSync('index.html', 'utf-8'); 
const displayCard = fs.readFileSync('card.html', 'utf-8');

const server = http.createServer((request, response) => {
    const path = request.url.toLowerCase();

    if (path === '/' || path === '/home') {
        response.writeHead(200, { 'content-Type': 'text/html' });
        response.write(displayNotes, 'utf-8', (_err) => {
            if (_err) return console.log(_err);
        });
        console.log('Welcome to home page');
        response.end();
    } else if (path === '/card.html') {
        response.writeHead(200, { 'content-Type': 'text/html' });
        response.write(displayCard, 'utf-8', (_err) => {
            if (_err) return console.log(_err);
        });
        console.log('Welcome to card page');
        response.end();
    } else {
        response.writeHead(404, { 'content-Type': 'text/html' });
        response.write('Error.... page note found!', 'utf-8')
        response.end();
    }
});

server.listen(3000, 'localhost', () => {
    console.log('Server started');
    console.log('enter --> localhost:3000 <-- in your browser');
});
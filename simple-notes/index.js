const fs = require('fs');
const http = require('http');

const displayNotes = fs.readFileSync('index.html', 'utf-8'); 
const cardTemplate = fs.readFileSync('card.html', 'utf-8');
const notes = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

const noteDataToHTML = (template, note) => {

    let output = template.replace('{{%TITLE%}}', note.title)
        .replace('{{%DESCRIPTION%}}', note.description)
        .replace('{{%DATA%}}', note.data)
        .replace('{{%AUTHOR%}}', note.author)
    return output;

    };

const server = http.createServer((request, response) => {
    const path = request.url.toLowerCase();

    


    if (path === '/' || path === '/home') {
        
        const allNotesHtml = displayNotes.replace('{{%CONTENT%}}', notes.map((note) => {
            noteDataToHTML(cardTemplate, note)
        }));
        response.writeHead(200, { 'content-Type': 'text/html' });
        response.write(allNotesHtml, 'utf-8', (_err) => {
            if (_err) return console.log(_err);
        });
        console.log('Welcome to home page');
        response.end();
    } else if (path === '/card.html') {
        response.writeHead(200, { 'content-Type': 'text/html' });
        response.write(cardTemplate, 'utf-8', (_err) => {
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
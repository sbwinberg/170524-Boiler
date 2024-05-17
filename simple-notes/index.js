const fs = require('fs');
const http = require('http');
const oUrl = require('url');

const displayNotes = fs.readFileSync('index.html', 'utf-8'); 
const cardTemplate = fs.readFileSync('card.html', 'utf-8');
const notes = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

const noteDataToHTML = (template, note) => {

    return template
        .replace('{{%TITLE%}}', note.title)
        .replace('{{%DESCRIPTION%}}', note.description)
        .replace('{{%DATE%}}', note.date)
        .replace('{{%AUTHOR%}}', note.author)

    };

const server = http.createServer((request, response) => {
    // const path = request.url.toLowerCase();
    const { query, pathname: path} = oUrl.parse(request.url, true);
    console.log(query);

    if (path === '/' || path === '/home') {
        
        const allNotesHtml = displayNotes.replace('{{%CONTENT%}}', notes.map((note) => {
            return noteDataToHTML(cardTemplate, note)
        }).join(''));
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(allNotesHtml, 'utf-8', (_err) => {
            if (_err) return console.log(_err);
        });
        console.log('Welcome to home page');
        response.end();
    } else if (path === '/card.html') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(cardTemplate, 'utf-8', (_err) => {
            if (_err) return console.log(_err);
            
        });   
        }
        

        console.log('Welcome to card page');
        response.end();
    } else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.write('Error.... page note found!', 'utf-8')
        response.end();
    }
});

server.listen(3000, 'localhost', () => {
    console.log('Server started');
    console.log('enter --> localhost:3000 <-- in your browser');
});
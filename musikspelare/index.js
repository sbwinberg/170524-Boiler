const fs = require('fs');
const http = require('http');

const indexJS = fs.readFileSync('index.js', 'utf-8');
const jsonData = JSON.parse(fs.readFileSync('data.json', 'utf-8'));


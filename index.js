const http = require('http');
const fs = require('fs');
const path = require('path');   
const url = require('url');
const dataDir = path.join(__dirname, 'data');
const server = http.createServer((req, res) => {
    if(req.url =='/joke'&& req.method === 'GET'){ 
        getAllJokes(req, res);
    }
    if(req.url =='/joke'&& req.method === 'POST'){
    addJoke(req, res);
    }
});
server.listen(3000)
function getAllJokes(req, res) {
    let dir = fs.readdirSync(dataDir);
    let alljokes =[];
    for( let i = 0; i<dir.length; i++){
        let file = fs.readFileSync(path.join(dataDir, i+'.json'));
        let jokeJson = Buffer.from(file).toString();
        let joke = JSON.parse(jokeJson);
        joke.id = i;
        alljokes.push(joke);
    }
    res.end(JSON.stringify(alljokes));
}
function addJoke(req, res) {
    let data = '';
    req.on('data', function(chunk) {
        data += chunk;
    });
    req.on('end', function()  {
    let joke = JSON.parse(data);
    joke.likes = 0;
    joke.dislikes = 0;
    let dir = fs.readdirSync(dataDir);
    let fileName = dir.length + '.json';
    let filePath = path.join(dataDir, fileName);
    fs.writeFileSync(filePath, JSON.stringify(joke));
    res.end()    ;
    });
}
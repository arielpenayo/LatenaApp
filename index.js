var express = require('express');
var app = express();
var path = require('path');
const PORT = 3001;
app.engine('html', require('ejs').renderFile);

app.use(express.static('./')); 

app.get('*', function(req, res, next) {
    res.render(path.join(__dirname +'/index.html'));
});


app.listen(PORT);
console.log("LATENA APP server.js corriendo en el puerto ",PORT);
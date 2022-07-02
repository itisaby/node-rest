const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 8000;

app.get("/", (req, res)=>{
    res.send("Hello World");
})
app.get("/about", (req, res)=>{
    res.send("About Page");
})
app.get("/contact", (req, res)=>{
    res.send("Contact Page");
})

console.log('test')
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
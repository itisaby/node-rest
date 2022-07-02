const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 8000;

app.get("/", (req, res)=>{
    res.send("Hello World");
})

console.log('test')
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
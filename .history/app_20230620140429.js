const express = require('express');
const app = express();

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.send('HELLO FROM YELP CAMP!')
})
app.listen(3000, () => {
    console.log('Serving on port 3000')
})
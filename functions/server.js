const serverless = require('serverless-http');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/save', (req, res) => {
    fs.writeFile('formData.json', JSON.stringify(req.body), (err) => {
        if (err) {
            res.status(500).send('Error saving data');
        } else {
            res.send('Data saved');
        }
    });
});

app.get('/load', (req, res) => {
    fs.readFile('formData.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error loading data');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

module.exports.handler = serverless(app);

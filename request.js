const Vonage = require('@vonage/server-sdk');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send({message: "Hello, world!"});
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


const vonage = new Vonage({
  apiKey: '892feb2a',
  apiSecret: 'strZSEYTUSs3M3s2'
});


const number = 2349068722097

app.post('/request', (req, res) => {
    // We verify that the client has included the `number` property in their JSON body
    if (!number) {
        res.status(400).send({message: "You must supply a `number` prop to send the request to"})
        return;
    }
    // Send the request to Vonage's servers
    vonage.verify.request({
        number: number,
        // You can customize this to show the name of your company
        brand: 'Vonage Demo App',
        // We could put `'6'` instead of `'4'` if we wanted a longer verification code
        code_length: '4'
    }, (err, result) => {
        if (err) {
            // If there was an error, return it to the client
            res.status(500).send(err.error_text);
            return;
        }
        // Otherwise, send back the request id. This data is integral to the next step
        const requestId = result.request_id;
        res.send({requestId});
    });
})
app.post('/verify', (req, res) => {
    // We require clients to submit a request id (for identification) and a code (to check)
    if (!req.body.requestId || !req.body.code) {
        res.status(400).send({message: "You must supply a `code` and `request_id` prop to send the request to"})
        return;
    }
    // Run the check against Vonage's servers
    vonage.verify.check({
        request_id: req.body.requestId,
        code: req.body.code
    }, (err, result) => {
        if (err) {
            res.status(500).send(err.error_text);
            return;
        }
        res.send(result);
    });
})
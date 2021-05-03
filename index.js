/// https://www.youtube.com/watch?v=HlYFW2zaYQM
/// Push Notifications Using Node.js & Service Worker
/// Traversy Media

const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json())

const publicVapidKey = 'BL8V16cTdgeTJtNPpnS6gUMG_yg99xnZbq5qYZ-MtgEKfh4XXmVTaJrTMMI9Ecl4P2YpcqzOtGh3uY1vAeFB0eA';
const privateVapidKey = 'ap2D3m2mFDo-cNdK1FWjmUvDi5IkxOk5MgM1V7Z_DEw';

webpush.setVapidDetails('mailto:kyle.beavin@tcmcllc.com', publicVapidKey, privateVapidKey);

// Subscribe Route
app.post('/subscribe', (req, res) => {
    // Get push subscription object
    const subscription = req.body;

    // Send 201 - resource created
    res.status(201).json({});

    // Create payload
    const payload = JSON.stringify({ title: 'Push Test'});

    // Pass object into sendNotification
    webpush.sendNotification(subscription, payload).catch(err => console.error(err));
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port: ${port}`));
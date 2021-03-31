//EP 1
//ตอบกลับ message ที่ส่งมากลับคืน

const express = require('express');
const line = require('@line/bot-sdk');
const settings = require('./config.json');

const app = express();

console.log(settings);

const config = {
    channelAccessToken: settings.line.channelAccessToken,
    channelSecret: settings.line.channelSecret
};

const client = new line.Client(config);

app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

function handleEvent(event) {

    console.log(event);
    if (event.type === 'message' && event.message.type === 'text') {
        handleMessageEvent(event);
    } else {
        var msg = {
            type: 'text',
            text: 'ไม่เข้าใจครับ'
        };
    
        return client.replyMessage(event.replyToken, msg);
    }
}

function handleMessageEvent(event) {
    var msg = {
        type: 'text',
        text: event.message.text
    };

    return client.replyMessage(event.replyToken, msg);
}

app.set('port', (settings.port));

app.listen(app.get('port'), function () {
    console.log('run at port', app.get('port'));
});
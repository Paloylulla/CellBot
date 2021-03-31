//EP 1
//ตอบกลับ message ธรรมดา

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
    if (event.type === 'message' && event.message.type === 'text' && event.message.text === 'สวัสดี') {
        handleMessageEvent(event);
    } else {
        var msg = {
            type: 'text',
            text: 'ไม่พิมพ์สวัสดีหน่อยเหรอครับ?'
        };
    
        return client.replyMessage(event.replyToken, msg);
    }
}

function handleMessageEvent(event) {
    var msg = {
        type: 'text',
        text: 'สวัสดีครับ'
    };

    return client.replyMessage(event.replyToken, msg);
}

app.set('port', (settings.port));

app.listen(app.get('port'), function () {
    console.log('run at port', app.get('port'));
});
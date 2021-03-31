//EP 2
//ตอบกลับ message รูปภาพ

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
        // return Promise.resolve(null);
        return client.replyMessage(event.replyToken, {
            type: 'text',
            text: JSON.stringify(event)
            }).catch((err) => {
                console.error("replyMessage : ",err);
            });
    }
}

function handleMessageEvent(event) {
    var msgs = [];
    if(event.message.text == 'สวัสดี'){
        msgs.push({
            "type": "image",
            "originalContentUrl": "https://image.freepik.com/free-vector/thailand-male-female-traditional-costume-thai-people-greeting-sawasdee-thai-flag-white-background-cartoon-character_3559-1395.jpg",
            "previewImageUrl": "https://image.freepik.com/free-vector/thailand-male-female-traditional-costume-thai-people-greeting-sawasdee-thai-flag-white-background-cartoon-character_3559-1395.jpg",
            "animated": false
        });
        msgs.push({
            type: 'text',
            text: 'สวัสดีครับ'
        });
    } else {
        msgs.push({
            type: 'text',
            text: 'ไม่เข้าใจครับ'
        });
    }

    return client.replyMessage(event.replyToken, msgs).catch((err) => {
        console.error("replyMessage : ",err);
    });
}

app.set('port', (settings.port));

app.listen(app.get('port'), function () {
    console.log('run at port', app.get('port'));
});
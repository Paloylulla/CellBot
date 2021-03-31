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
    if (event.type === 'message' && event.message.type === 'text') {
        handleMessageEvent(event);
    } else {
        var msgs = [];
        msgs.push({
            "type": "image",
            "originalContentUrl": "https://www.catdumb.com/wp-content/uploads/2015/08/cat-vampire8-2-1068x603.jpg",
            "previewImageUrl": "https://www.catdumb.com/wp-content/uploads/2015/08/cat-vampire8-2-1068x603.jpg",
            "animated": false
        });
        msgs.push({
            type: 'text',
            text: 'พิมพ์มาสิเจ้ามนุษย์ แง้ววว'
        });
        return client.replyMessage(event.replyToken, msgs);
    }
}

function handleMessageEvent(event) {

    var msgs = [];
    if(event.message.text === "ขอเมนูหน่อย"){
    msgs.push({
        "type": "template",
        "altText": "this is a carousel template",
        "template": {
          "type": "carousel",
          "columns": [
            {
              "title": "เมนู1",
              "text": "เมนู1จ้า",
              "actions": [
                {
                  "type": "message",
                  "label": "ปุ่ม1",
                  "text": "ปุ่ม1"
                },
                {
                  "type": "message",
                  "label": "ปุ่ม2",
                  "text": "ปุ่ม2"
                },
                {
                  "type": "message",
                  "label": "ปุ่ม3",
                  "text": "ปุ่ม3"
                }
              ]
            },
            {
              "title": "เมนู2",
              "text": "เมนู2จ้า",
              "actions": [
                {
                  "type": "message",
                  "label": "ปุ่ม1",
                  "text": "ปุ่ม1"
                },
                {
                  "type": "message",
                  "label": "ปุ่ม2",
                  "text": "ปุ่ม2"
                },
                {
                  "type": "datetimepicker",
                  "label": "เลือกวันที่จ้า",
                  "data": "date",
                  "mode": "datetime",
                  "initial": "2021-03-30T10:36",
                  "max": "2022-03-30T10:36",
                  "min": "2020-03-30T10:36"
                }
              ]
            }
          ]
        }
      });
     } else {

        msgs.push({
            "type": "image",
            "originalContentUrl": "https://i.pinimg.com/originals/dd/6f/2b/dd6f2b3892598fb24eec695a39720de2.jpg",
            "previewImageUrl": "https://i.pinimg.com/originals/dd/6f/2b/dd6f2b3892598fb24eec695a39720de2.jpg",
            "animated": false
        });
        msgs.push({
            type: 'text',
            text: 'พิมพ์ว่าขอเมนูหน่อย'
        });
      }

    return client.replyMessage(event.replyToken, msgs);
}

app.set('port', (settings.port));

app.listen(app.get('port'), function () {
    console.log('run at port', app.get('port'));
});
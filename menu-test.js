//EP 5
//ตอบกลับ message menu

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
      "type": "flex",
      "altText": "this is a flex message",
      "contents": {
        "type": "carousel",
        "contents": [
          {
            "type": "bubble",
            "hero": {
              "type": "image",
              "url": "https://i0.wp.com/www.livingpop.com/wp-content/uploads/2020/04/rubber-plant-1.jpg?ssl=1",
              "size": "full",
              "aspectRatio": "20:13",
              "aspectMode": "cover"
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": "ยางอินเดีย",
                  "weight": "bold",
                  "size": "xl",
                  "wrap": true,
                  "contents": []
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "flex": 1,
                  "contents": [
                    {
                      "type": "text",
                      "text": "฿200",
                      "weight": "bold",
                      "size": "xl",
                      "flex": 0,
                      "wrap": true,
                      "contents": []
                    }
                  ]
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "button",
                  "action": {
                    "type": "message",
                    "label": "Details",
                    "text": "ยางอินเดีย"
                  },
                  "flex": 2,
                  "color": "#AAAAAA",
                  "style": "primary"
                }
              ]
            }
          },
          {
            "type": "bubble",
            "hero": {
              "type": "image",
              "url": "https://th-test-11.slatic.net/p/cd3ac3f49308fd2f8cb85fb2d9996895.jpg",
              "size": "full",
              "aspectRatio": "20:13",
              "aspectMode": "cover"
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": "Monstera",
                  "weight": "bold",
                  "size": "xl",
                  "wrap": true,
                  "contents": []
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "contents": [
                    {
                      "type": "text",
                      "text": "฿150",
                      "weight": "bold",
                      "size": "xl",
                      "flex": 0,
                      "wrap": true,
                      "contents": []
                    }
                  ]
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "button",
                  "action": {
                    "type": "message",
                    "label": "See more",
                    "text": "monstera"
                  },
                  "color": "#AAAAAAFF",
                  "style": "primary"
                }
              ]
            }
          },
          {
            "type": "bubble",
            "hero": {
              "type": "image",
              "url": "https://fi.lnwfile.com/7nakk3.jpg",
              "size": "full",
              "backgroundColor": "#FFFFFF"
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": "พลูงาช้าง",
                  "weight": "bold",
                  "size": "xl",
                  "contents": []
                },
                {
                  "type": "text",
                  "text": "฿80",
                  "weight": "bold",
                  "size": "xl",
                  "contents": []
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "horizontal",
              "flex": 1,
              "contents": [
                {
                  "type": "button",
                  "action": {
                    "type": "message",
                    "label": "See more",
                    "text": "พลูงาช้าง"
                  },
                  "color": "#AAAAAA",
                  "style": "primary"
                }
              ]
            }
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
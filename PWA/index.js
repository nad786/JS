let express = require('express');  
const path = require('path');
const webPush = require('web-push');
const cors = require('cors');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

let app=express();  


app.use(cors())


const { publicKey, privateKey } = webPush.generateVAPIDKeys();
// Configure the push notification service
webPush.setVapidDetails(
    // 'http://localhost:5500/',
  'mailto:nadeem.nad786@gmail.com',
  publicKey,
  privateKey,
  
);

app.get("/get", (req, res) => {
    res.send({key: publicKey});    
});
let subscription;
app.get("/noti", (req, res) => {
    sendPushNotification(subscription);
    res.send("Message")
})


app.post("/subscribe", (req, res) => {
    // Get pushSubscription object
    const subscription = req.body;
  
    // Send 201 - resource created
    res.status(201).json({});
  
    // Create payload
    const payload = JSON.stringify({ title: "Push Test" });
  
    // Pass object into sendNotification
    webpush
      .sendNotification(subscription, payload)
      .catch(err => console.error(err));
  });

app.post('/save-subscription', jsonParser, (req, res) => {
    // subscription = req.body;
    // Save the subscription details in your database or storage system
    // You can associate the subscription with a specific user or device
   const body = req.body;
   const p256dh = base64ToArrayBuffer(body.p256dh);
   const auth = base64ToArrayBuffer(body.auth);
    subscription = {
        endpoint: body.endpoint,
        keys: {
          p256dh: p256dh,
          auth: auth
        }
      }
      webPush.setVapidDetails(
        // 'http://localhost:5500/',
      'mailto:nadeem.nad786@gmail.com',
      publicKey,
      privateKey,
      body.endpoint
      
    );
    res.status(201).json({ message: 'Subscription saved', serverKey: publicKey });
  });

app.get('/get_example2', function (req, res) {  
    res.send('<p>Username: ' + req.query['first_name']+'</p><p>Lastname: '+req.query['last_name']+'</p>');  
}) ;

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  });

  app.post('/send-notification', express.json(), (req, res) => {
    const notificationPayload = JSON.stringify(req.body);
  
    // Retrieve the saved subscriptions from your database or storage system
    const subscriptions = [];
  
    // Send the push notification to each subscribed device
    subscriptions.forEach(subscription => {
      webPush.sendNotification(subscription, notificationPayload)
        .then(function(response) {
          console.log('Push notification sent:', response);
        })
        .catch(function(error) {
          console.error('Error sending push notification:', error);
        });
    });
  
    res.status(200).json({ message: 'Push notification sent' });
  });

  
  
let server = app.listen(3000, function () {  
  let host = server.address().address  
  let port = server.address().port  
  console.log("Example app listening port ", host, port)  
}) 





// Define the push notification payload
const notificationPayload = JSON.stringify({
  title: 'New Notification',
  message: 'Hello, World!'
});

// Send a push notification to a specific subscription
function sendPushNotification(subscription) {
    
    const options = {
        vapidDetails: {
          subject: 'mailto:nadeem.nad786@gmail.com',
          publicKey: publicKey,
          privateKey: privateKey
        }
      };;
  webPush.sendNotification(subscription, notificationPayload)
    .then(function(response) {
      console.log('Push notification sent:', response);
    })
    .catch(function(error) {
      console.error('Error sending push notification:', error);
    });
}

function base64ToArrayBuffer(base64) {
    return base64;
    const binaryString = Buffer.from(base64, 'base64').toString('binary');
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }
    return byteArray.buffer;
  }

  

// // Example usage
// const subscription = {
//   endpoint: 'SUBSCRIPTION_ENDPOINT',
//   keys: {
//     p256dh: 'P256DH_KEY',
//     auth: 'AUTH_KEY'
//   }
// };

// sendPushNotification(subscription);

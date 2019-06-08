let mqtt = require('mqtt')
let client  = mqtt.connect('mqtt://congrongyun.com:8884',{
    username : 'lihaitao',
    password : 'li123321',
    keepalive : 60,
    connectTimeout : 30 * 1000,
    clientId : 'mqttjs_cr_' + Math.random().toString(16).substr(2, 8)
});

client.on('connect', function () {
    console.log(666);
    client.subscribe('presence', function (err) {
        if (!err) {
            client.publish('presence', 'Hello mqtt')
        }
    })
});

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString());
    client.end()
});
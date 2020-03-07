import mqtt from 'mqtt';
let once = true;
export default {
    client: null,
    //连接mqtt
    connect(name = "dv_2", psd = "1Tr5bCpY") {
        this.client = mqtt.connect("mqtt://106.12.90.144:8884", {
            username: name,
            password: psd,
            keepalive: 60,
            connectTimeout: 30 * 1000,
            clientId: 'mqttjs_cr_' + Math.random().toString(16).substr(2, 8)
        });
        this.client.on('connect',  () => {
            this.client.subscribe("iot/realData/" + name, {
                qos: 1
            })
        });
        this.client.on('message', function (topic, message, packet) {
            if(once){
                once = false;
                console.log(55555555, JSON.parse(message));
            }
            
        });
    },
}
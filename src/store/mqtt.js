import config from "../config"
import mqtt from "mqtt";
const state = {
    client:null,//mqtt对象
    username:'',//账号
    password:'',//密码
    message:[]
}

const mutations = {
    SET_DATA: (state, {client,username,password,message}) => {
        if(client){
            state.client = client
        }
        if(username){
            state.username = username
        }
        if(password){
            state.password = password
        }
        if(message){
            state.message = message
        }
    },
    RESET_DATA(state){
        if(state.client){
            state.client.end()
        }
        state.client = null;
        state.username = '';
        state.password = '';
        state.message = {};
    }
}

const actions = {
    initMqtt({state,commit},{username,password}){
        commit('RESET_DATA');
        console.log('mqtt链接：'+ config.mqttUrl + '，' +username + '，'+password)
        let client = mqtt.connect(config.mqttUrl,{
                username: username,
                password: password,
                keepalive: 60,
                connectTimeout: 30 * 1000,
                clientId:"mqttjs_cr_" + Math.random().toString(16).substr(2, 8)
        });
        client.on("connect", () => {
            console.log('onconnect')
            commit('SET_DATA',{client,username,password});
            client.subscribe("iot/realData/" + username, {
                qos: 1
            });
            // console.log('connect success')
        });
        client.on("message", (topic, message, packet) => {
            message = JSON.parse(message);
            console.log('onmessage', message)
            if (message.state === '0') {
                commit('SET_DATA',{message:message.mt});
            }
        });
    },
    setMqttData({state,commit},{id,value}){

        return new Promise(resolve => {
            let topic = 'iot/control/' + state.username
            let message = {
                id: state.username,
                mt:{
                    [id]:Number(value)
                }
            }
            let opts = {
                qos: 1,
                retain:false,
                dup:false
            }
            console.log('mqttSetData',topic,message,opts)
            state.client.publish(topic,JSON.stringify(message),opts,function(res){
                resolve(res)
            });
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

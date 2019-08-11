<template>
        <div>
            <div class="message">
                <XHeader :left-options="{preventGoBack:true}"
                @on-click-back="$router.goBack()" title="消息设置"></XHeader>
                <group>
                    <x-switch title="声音" v-model="xswitch.voice"></x-switch>
                    <x-switch title="振动" v-model="xswitch.vibration"></x-switch>
                </group>
                <group>
                    <x-switch title="消息推送" v-model="xswitch.msgPush"></x-switch>
                </group>
                
            </div>
        </div>
    </template>
      
      <script>
      import { XHeader,XSwitch,Group } from "vux";
      
      export default {
        components: {
            XSwitch,
            Group,
            XHeader
        },
        data() {
          return {
           xswitch:{
                voice:true,
                vibration:true,
                msgPush:false
           },
          };
        }
      };
      </script>
    
      <style scoped>
         
      </style>
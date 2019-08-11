<template>
        <div>
            <div class="language">
                <XHeader :left-options="{preventGoBack:true}"
                @on-click-back="$router.goBack()" title="语言类型"></XHeader>
                <group >
                    <radio  :options="options" v-model="value"></radio>
                </group>
            </div>
        </div>
    </template>
      
      <script>
      import { XHeader,Radio,Group } from "vux";
      
      export default {
        components: {
            Radio,
            Group,
            XHeader
        },
        data() {
          return {
            options:['简体中文','English','日本語'],
            value:'简体中文'
          };
        }
      };
      </script>
    
      <style scoped>
         /deep/ .weui-cell {
             padding: 16px 15px;
         }
      </style>
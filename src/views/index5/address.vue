<template>
        <div>
            <div class="address">
                <XHeader :left-options="{backText: ''}" title="修改地址" ><XButton slot="right" type="warn">保存</XButton></XHeader>
                <Group class="address-input">
                    <XTextarea  v-model="address" placeholder="请输入地址"></XTextarea>
                </Group>
                
            </div>
        </div>
    </template>
      
      <script>
      import { XHeader,Group,XTextarea,XButton } from "vux";
      
      export default {
        components: {
            XHeader,
            Group,
            XTextarea,
            XButton
        },
        data() {
          return {
            address:'南京市江东中路16号'
          };
        }
      };
      </script>
    
      <style scoped>
          /deep/ .vux-header .vux-header-right {
              top:7px;
          }
          .address .weui-btn {
              font-size: 14px;
              line-height: 28px;
          }
      </style>
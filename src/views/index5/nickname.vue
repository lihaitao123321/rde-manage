<template>
        <div>
            <div class="nickname">
                <XHeader :left-options="{preventGoBack:true}"
                @on-click-back="$router.goBack()" title="修改昵称" ><XButton slot="right" type="warn" @click.native="onSave">保存</XButton></XHeader>
                <Group class="nickname-input">
                    <XInput  v-model="nickname" placeholder="请输入昵称"></XInput>
                </Group>
                <toast v-model="showPositionValue" type="text" :time="800" is-show-mask text="修改成功" :position="position"></toast>
            </div>
        </div>
    </template>
      
      <script>
      import { XHeader,Group,XInput,XButton,Toast } from "vux";
      
      export default {
        components: {
            XHeader,
            Group,
            XInput,
            XButton,
            Toast
        },
        data() {
          return {
           nickname:'阮高峰',
           showPositionValue:false,
           position:''
          };
        },
        methods: {
            
            onSave() {
                if (this.nickname !='') {
                    this.Tools.ajax({
                        method: '/user/update',
                        data: {
                            "username": this.nickname,
                            "imageUrl": ''
                        }
                    }).then(res => {
                        this.showPositionValue = true;
                        this.position = 'middle'
                    }).catch(() => { })
                }
            }
        },
      };
      </script>
    
      <style scoped>
          /deep/ .vux-header .vux-header-right {
              top:7px;
          }
          .nickname .weui-btn {
              font-size: 14px;
              line-height: 28px;
          }
      </style>
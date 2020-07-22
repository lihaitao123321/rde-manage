<template>
        <div>
            <div class="nickname">
                <XHeader :left-options="{preventGoBack:true}"
                @on-click-back="$router.goBack()" title="修改昵称" ><XButton slot="right" type="warn" @click.native="onSave">保存</XButton></XHeader>
                <Group class="nickname-input">
                    <XInput  v-model="nickname" placeholder="请输入昵称"></XInput>
                </Group>
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
           nickname:'',
          };
        },
        mounted(){
            this.nickname = this.$route.query.username
        },
        methods: {
            onSave() {
                if (this.nickname !=='') {
                    this.Tools.ajax({
                        method: 'cloud/api/app/my/updateUserName',
                        data: {
                            username: this.nickname,
                        }
                    }).then(res => {
                        if(res.status == 0){
                            this.$toast.success('修改昵称成功')
                            this.$router.goBack()
                        }else{
                            this.$toast.error('修改昵称失败')
                        }
                    }).catch(() => {
                        this.$toast.error('修改昵称失败')
                    })
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
              color: white;
              background-color: #2B7FF3FF;
          }
      </style>

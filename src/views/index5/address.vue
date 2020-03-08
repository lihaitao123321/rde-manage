<template>
        <div>
            <div class="address">
                <XHeader :left-options="{preventGoBack:true}"
                @on-click-back="$router.goBack()" title="修改地址" ><XButton slot="right" type="warn" @click.native="onSave">保存</XButton></XHeader>
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
        },
        mounted(){
            this.address = this.$route.query.address
        },
        methods:{
            onSave(){
                if(this.address !== ''){
                    this.Tools.ajax({
                        method:'cloud/api/app/my/updateAddress',
                        data:{
                            address:this.address
                        }
                    }).then(res=>{
                        if(res.code === 0){

                        }
                    })
                }
            },
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
              color: white;
              background-color: #2B7FF3FF;
          }
      </style>
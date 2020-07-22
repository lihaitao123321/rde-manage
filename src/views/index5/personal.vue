<template>
  <div>
    <div class="t_page">
      <XHeader :left-options="{preventGoBack:true}" @on-click-back="$router.goBack()" title="个人中心"></XHeader>
      <Group>
        <cell :title="cellData.avatar" is-link @click.native="isShowImg=true">
          <div @click="isShowImg=true">
            <img class="headImg" :src=form.imageUrl alt="">
          </div>
        </cell>
        <cell :title="cellData.nickname" :value="form.username" is-link :link="{path:'/nickname',query:{username:form.username}}"></cell>
        <cell :title="cellData.gender" :value="form.sex" is-link @click.native="change"></cell>
        <cell :title="cellData.companyName" :value="form.companyName"></cell>
        <cell :title="cellData.department" :value="form.deptName"k></cell>
      </Group>
      <Actionsheet v-model="isShowImg" :menus="ImageList" @on-click-menu="onSelect" show-cancel></Actionsheet>
      <Actionsheet v-model="isShowSex" :menus="menus" @on-click-menu="updateSex" show-cancel></Actionsheet>
      <Group>
        <cell :title="cellData.area" :value="form.areaName" is-link :link="{path:'/region'}"></cell>
        <cell :title="cellData.address" :value="form.address" is-link :link="{path:'/address',query:{address:form.address}}"></cell>
      </Group>
    </div>
  </div>
</template>

  <script>
import { Group, Cell, XHeader, Actionsheet } from "vux";

export default {
  components: {
    Group,
    Cell,
    XHeader,
    Actionsheet
  },
  data() {
    return {
      form: {
        imageUrl: "",
        username: "",
        sex: "",
        companyName: "",
        deptName: "",
        areaId: "",
        areaName: "",
        address: ""
      },
      isShowImg:false,
      ImageList:['拍照','从手机相册选择'],
      cellData: {
        avatar: "头像",
        nickname: "昵称",
        gender: "性别",
        companyName: "所在单位",
        department: "部门",
        area: "所在地区",
        address: "详细地址"
      },
      isShowSex: false,
      menus: {
        0: "男",
        1: "女"
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.Tools.ajax({
        method: "cloud/api/app/my/getMyUserData",
        data: {}
      }).then(res => {
        if (res.code === 0) {
          this.form = res.data;
        } else {
          this.$vux.toast.text("加载失败");
        }
      });
    },
    updateSex(key,item) {
      if(key != 'cancel'){
        this.Tools.ajax({
          method:'cloud/api/app/my/updateUserSex',
          data:{
            sex:key
          }
        }).then(res=>{
          if(res.status === "0"){
            if(res.status == 0){
              this.$toast.success('修改成功')
              this.init();
            }else{
              this.$toast.error('修改失败')
            }
          }else {
            this.$vux.toast.text('修改失败');
          }
        })
      }
    },
    change() {
      this.isShowSex = true;
    },
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.showAction = false;
      if (item === 0) {
        navigator.camera.getPicture(
                res => {
                  this.uploadImg(res);
                },
                err => {},
                {
                  sourceType: Camera.PictureSourceType.CAMERA, //拍照
                  destinationType: Camera.DestinationType.DATA_URL,
                  quality: 50,
                  allowEdit: true,
                  saveToPhotoAlbum: false
                }
        );
      } else if (item === 1) {
        navigator.camera.getPicture(
                res => {
                  this.uploadImg(res);
                },
                err => {},
                {
                  sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM, //相册
                  destinationType: Camera.DestinationType.DATA_URL,
                  quality: 50,
                  allowEdit: true,
                  saveToPhotoAlbum: false
                }
        );
      }
    },
    uploadImg(base64DataUrl) {
      base64DataUrl = "data:image/png;base64," + base64DataUrl;
      let formData = new FormData();
      formData.append("filedata", this.convertBase64UrlToBlob(base64DataUrl));
      formData.append("filename", new Date().getTime().toString() + '.png');
      this.Tools.ajax({
        method: "/cloud/api/uploadFile",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        data: formData
      }).then(data => {
        console.log('上传接口',data)
        if (data.status == 0) {
          this.save(data.msg);
        }
      });
    },
    convertBase64UrlToBlob(urlData) {
      let bytes = window.atob(urlData.split(",")[1]); //去掉url的头，并转换为byte

      //处理异常,将ascii码小于0的转换为大于0
      let ab = new ArrayBuffer(bytes.length);
      let ia = new Uint8Array(ab);
      for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }

      return new Blob([ab], { type: "image/png" });
    },
    save(url) {
      this.Tools.ajax({
        method: "/cloud/api/app/my/updateImageUrl",
        data: {
          imageUrl: url
        }
      }).then(data => {
        console.log('保存接口',data)
        if(res.status === "0"){
          if(res.status == 0){
            this.$toast.success('修改成功')
            this.init();
          }else{
            this.$toast.error('修改失败')
          }
        }else {
          this.$toast.error('修改失败')
        }
      }).catch(()=>{
        this.$toast.error('修改失败')
      });
    }
  }
};
</script>

  <style lang="less" scoped>
.t_page {

}
    .headImg{
      width:40px;
      height:40px;
      border-radius:50%;
    }
</style>


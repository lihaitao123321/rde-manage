<template>
    <div class="t_page">
        <x-header :left-options="{preventGoBack:true}" @on-click-back="$router.goBack()">选择登录企业</x-header>
        <div class="content">
            <checklist
                label-position="left"
                :options="dataList"
                v-model="companyId"
                :max="1"
                @on-change="selectCompany"
            ></checklist>
        </div>
    </div>
</template>

<script>
import { XHeader, Checklist } from "vux";
import { mapGetters } from "vuex";
export default {
  components: {
    XHeader,
    Checklist
  },
  data() {
    return {
      companyId: [],
      dataList: [],
      username: "",
      telephone: "17630378060",
      password: "",
      repassword: "",
      code: "",
      codeText: "获取验证码",
      sending: false,
      menus: {
        menu1: "Take Photo",
        menu2: "Choose from photos"
      },
      showMenus: false
    };
  },
  created() {
      console.log(66666,this.$store.state.loginInfo.companyId)
    this.companyId = [this.$store.state.loginInfo.companyId]
  },
  mounted() {
    this.getAllCompany();
  },
  computed: {
    ...mapGetters(["company"])
  },
  methods: {
    getAllCompany() {
      this.Tools.ajax({
        method: "/cloud/api/findByUserId",
        data: {}
      }).then(res => {
        res.forEach(item => {
          item.key = item.id;
          item.value = item.name;
        });
        this.dataList = res;
      });
    },
    selectCompany(value, label) {
      if (value.length === 0 || value[0] === this.company.id) {
        return;
      }
      this.Tools.ajax({
        method: "/cloud/api/company/changeAppToken",
        data: {
          companyId: value[0]
        }
      }).then(res => {
          if(res.code == 0){
              this.$toast.success('修改成功')
              this.$store.commit("setCompany", { id: value[0], name: label[0] });
              this.$router.goBack();
          }else{
              this.$toast.fail('修改失败')
          }
      });
    }
  }
};
</script>
<style lang='less' scoped>
.t_page {
  .content {
    background-color: white;
    .item_c {
      display: flex;
      align-items: center;
      padding: 10px;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      img {
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }
    }
  }
}

.sendCode {
  position: absolute;
  z-index: 1;
  top: -37px;
  right: 15px;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  background-color: violet;
  font-size: 12px;
  border-radius: 3px;
}

.active {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>

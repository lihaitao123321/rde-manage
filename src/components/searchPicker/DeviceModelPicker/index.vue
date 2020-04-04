<template>
    <div>
        <div class="little_title">设备型号：</div>
        <div class="uf uf-ac picker" @click="show=true">
            <div class="uf-f1 placeholder">{{placeholder}}</div>
            <i class="el-icon-caret-bottom sanjiao"></i>
        </div>
        <div v-transfer-dom>
            <popup v-model="show" class="vux-popup-picker">
                <popup-header
                    left-text="取消"
                    right-text="确定"
                    title="设备型号"
                    :show-bottom-border="false"
                    @on-click-left="show = false"
                    @on-click-right="ok"
                ></popup-header>
                <div class="vux-popup-picker-container">
                    <picker :data="options" v-model="select" @on-change="change"></picker>
                </div>
            </popup>
        </div>
    </div>
</template>
<script>
import { Picker, Popup, PopupHeader } from "vux";
export default {
  name: "searchOptions",
  components: {
    Picker,
    Popup,
    PopupHeader
  },
  props: {
    value: {
      type: [String, Number],
      default() {
        return "";
      }
    }
  },
  data() {
    return {
      placeholder: "",
      show: false,
      select: [this.value],
      options: []
    };
  },
  methods: {
    change() {},
    ok() {
      this.show = false;
      for (let i = 0; i < this.options[0].length; i++) {
        if (this.options[0][i].value == this.select[0]) {
          this.placeholder = this.options[0][i].name;
          this.$emit("input", this.options[0][i].value);
          return;
        }
      }
      this.placeholder = "";
    }
  },
  watch: {
    value() {
      this.select[0] = this.value;
      this.ok();
    }
  },
  created() {
    this.$store.dispatch("enumeration/getDeviceModelList").then(res => {
      console.log('getDeviceModelList', res)
      this.options = [res];
      this.ok();
    });
  }
};
</script>
<style lang="less" scoped>
.rightWarp {
  position: relative;
  height: 100%;
  .header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 46px;
    padding: 0 10px;
    line-height: 46px;
    font-size: 17px;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .footer {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    .reset {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 93px;
      height: 41px;
      background: rgba(242, 242, 245, 1);
      border-radius: 5px;
      font-size: 16px;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(102, 102, 102, 1);
      margin-right: 18px;
    }
    .ok {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 188px;
      height: 41px;
      background: rgba(43, 127, 243, 1);
      border-radius: 5px;
      font-size: 16px;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }
  }
  .little_title {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    font-family: PingFangSCMedium;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    margin-top: 10px;
    margin-bottom: 5px;
  }
  .list {
    position: absolute;
    bottom: 70px;
    left: 0;
    top: 46px;
    right: 0;
    padding: 0 10px;
    color: #e3e3e6;
    overflow-y: auto;
    .picker {
      width: 196px;
      height: 34px;
      padding: 10px;
      background: rgba(242, 242, 245, 1);
      border-radius: 3px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      .sanjiao {
        color: #2b7ff3;
      }
      .placeholder {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
      }
    }
    .inputClass {
      width: 100px;
      height: 34px;
      background: rgba(242, 242, 245, 1);
      border-radius: 3px;
      border: none;
      outline: none;
      padding-left: 8px;
      margin-right: 9px;
    }
    .KW {
      font-size: 14px;
      font-family: PingFangSCMedium;
      font-weight: 500;
      color: rgba(33, 33, 33, 1);
    }
    .hr {
      color: #f2f2f5;
      width: 12px;
      opacity: 0.3;
    }
  }
}
</style>

<template>
  <div>
    <div class="little_title">项目位置：</div>
    <div class="uf">
      <div class="uf uf-ac picker" @click="show=true">
        <div class="uf-f1 placeholder">{{placeholder1}}</div>
        <i class="el-icon-caret-bottom sanjiao"></i>
      </div>
      <div class="uf uf-ac picker" @click="show=true">
        <div class="uf-f1 placeholder">{{placeholder2}}</div>
        <i class="el-icon-caret-bottom sanjiao"></i>
      </div>
      <!-- <div class="uf uf-ac picker" @click="show=true">
        <div class="uf-f1 placeholder">{{placeholder}}</div>
        <i class="el-icon-caret-bottom sanjiao"></i>
      </div>-->
    </div>
    <div v-transfer-dom>
      <popup v-model="show" class="vux-popup-picker">
        <popup-header
          left-text="取消"
          right-text="确定"
          title="项目类型"
          :show-bottom-border="false"
          @on-click-left="show = false"
          @on-click-right="ok"
        ></popup-header>
        <div class="vux-popup-picker-container">
          <picker :columns="3" :data="options" v-model="select"></picker>
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
      placeholder1: "省会",
      placeholder2: "城市",
      show: false,
      select: [],
      options: []
    };
  },
  methods: {
    init() {
      if (!this.value) {
        this.select = [];
        this.placeholder1 = "";
        this.placeholder2 = "";
        return;
      }
      //查找当前id对应的对象父级id
      let child = "";
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].value == this.value) {
          this.select = [this.options[i].parent, this.value];
          this.placeholder2 = this.options[i].name;
          for (let j = 0; j < this.options.length; j++) {
            if (this.options[j].value == this.select[0]) {
              this.placeholder1 = this.options[j].name;
              break;
            }
          }
          break;
        }
      }
    },
    ok() {
      this.show = false;
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].value == this.select[0]) {
          this.placeholder1 = this.options[i].name;
        }
        if (this.options[i].value == this.select[1]) {
          this.$emit("input", this.select[1]);
          this.placeholder2 = this.options[i].name;
          return;
        }
      }
      this.placeholder1 = "";
      this.placeholder2 = "";
    }
  },
  watch: {
    value() {
      if (this.select.length === 0 || !this.value) {
        this.init();
      }
    }
  },
  created() {
    this.$store.dispatch("enumeration/getAreaList").then(res => {
      this.options = res;
      this.init();
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
      min-width: 93px;
      height: 34px;
      padding: 10px;
      background: rgba(242, 242, 245, 1);
      border-radius: 3px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      margin-right: 10px;
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

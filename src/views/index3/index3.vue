<template>
    <div class="t_page">
        <div class="content">
            <keep-alive>
                <router-view/>
            </keep-alive>
        </div>
        <tabbar v-model="tabActive">
            <tabbar-item v-for="item in this.menus" :key="item.link" :link="item.link">
                <img slot="icon" :src="item.icon">
                <img slot="icon-active" :src="item.activeIcon">
                <span class="tabbar_label" slot="label">{{item.title}}</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vux";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    Tabbar,
    TabbarItem
  },
  data() {
    return {
      menus: [
        {
          title: "报警管理",
          link: "/index3/baoJingListNew",
          icon: require("../../assets/images/index3/bj_black@2x.png"),
          activeIcon: require("../../assets/images/index3/bj_red@2x.png")
        },
        {
          title: "操作记录",
          link: "/index3/caoZuoList",
          icon: require("../../assets/images/index3/czjl_black@2x.png"),
          activeIcon: require("../../assets/images/index3/czjl_red@2x.png")
        },
        {
          title: "设备",
          link: "/index3/sheBeiList",
          icon: require("../../assets/images/index3/dzsb_black@2x.png"),
          activeIcon: require("../../assets/images/index3/dzsb_red@2x.png")
        },
        {
          title: "系统",
          link: "/index3/xiTongList",
          icon: require("../../assets/images/index3/ywsb_black@2x.png"),
          activeIcon: require("../../assets/images/index3/ywsb_red@2x.png")
        },
        {
          title: "项目",
          link: "/index3/xiangMuList",
          icon: require("../../assets/images/index3/dz_black@2x.png"),
          activeIcon: require("../../assets/images/index3/dz_red@2x.png")
        }
      ],
      tabActive: 0,
      value: "",
      rightOptions: {
        value: ""
      },
      entryUrl: document.location.href,
      showMenu: false,
      drawerVisibility: false,
      showMode: "push",
      showModeValue: "push",
      showPlacement: "left",
      showPlacementValue: "left"
    };
  },
  created() {
      this.diffPage(this.$route)
  },
  methods: {
    diffPage(to) {
      if (to.path == "/index3/baoJingListNew") {
        this.tabActive = 0;
      } else if (to.path == "/index3/caoZuoList") {
        this.tabActive = 1;
      } else if (to.path == "/index3/sheBeiList") {
        this.tabActive = 2;
      } else if (to.path == "/index3/xiTongList") {
        this.tabActive = 3;
      } else if (to.path == "/index3/xiangMuList") {
        this.tabActive = 4;
      }
    }
  },
  watch: {
    $route(to, from) {
        this.diffPage(to)
    }
  },
  computed: {}
};
</script>

<style lang="less" scoped>
.t_page{
  .content {
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 45px;
    left: 0;
    width: 100%;
    overflow-y: auto;
  }
}
</style>
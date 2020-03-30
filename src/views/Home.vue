<template>
  <div class="t_page">
    <div class="t_content">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
    <tabbar v-model="tabActive">
      <tabbar-item v-for="item in this.menus" :key="item.title" :link="item.link">
        <img slot="icon" :src="item.icon">
        <img slot="icon-active" :src="item.activeIcon">
        <span class="tabbar_label" slot="label">{{item.title}}</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vux";
export default {
  components: {
    Tabbar,
    TabbarItem
  },
  data() {
    return {
      tabActive: 0,
      menus: [
        {
          title: "首页",
          link: {
            path: "/home/index1",
            replace: true
          },
          icon: require("../assets/images/index1/shouye_black@3x.png"),
          activeIcon: require("../assets/images/index1/shouye_red@3x.png")
        },
        {
          title: "地图",
          link: "/index2",
          icon: require("../assets/images/index1/ditu_black@3x.png"),
          activeIcon: require("../assets/images/index1/ditu_red@3x.png")
        },
        {
          title: "监控",
          link: "/index3",
          icon: require("../assets/images/index1/jiankong_black@3x.png"),
          activeIcon: require("../assets/images/index1/jiankong_red@3x.png")
        },
        {
          title: "业务",
          link: {
            path: "/home/index4",
            replace: true
          },
          icon: require("../assets/images/index1/yewu_black@3x.png"),
          activeIcon: require("../assets/images/index1/yewu_red@3x.png")
        },
        {
          title: "我的",
          link: {
            path: "/home/index5",
            replace: true
          },
          icon: require("../assets/images/index1/wode_black@3x.png"),
          activeIcon: require("../assets/images/index1/wode_red@3x.png")
        }
      ]
    };
  },
  watch: {
    $route(to, from) {
      this.diffPage(to);
    }
  },
  methods: {
    diffPage(to) {
      if (to.path == "/home/index1") {
        this.tabActive = 0;
      } else if (to.path == "/index2") {
        this.tabActive = 1;
      } else if (to.path == "/index3") {
        this.tabActive = 2;
      } else if (to.path == "/home/index4") {
        this.tabActive = 3;
      } else if (to.path == "/home/index5") {
        this.tabActive = 4;
      }
    }
  },
  created() {
    this.diffPage(this.$route);
  }
};
</script>

<style scoped>
.overwrite-title-demo {
  margin-top: 5px;
}

.image {
  width: 20px;
  height: 20px;
}
</style>
<style scoped>
.layout {
  position: relative;
}
.dot {
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 1);
  border-radius: 50%;
}
.title {
  position: absolute;
  z-index: 1;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(33, 33, 33, 1);
}
</style>

<template>
    <div class="layout">
        <canvas ref="container" style="width: 100%; height: 300px;"/>
    </div>
</template>

<script>
import F2 from "@antv/f2";

const { Shape, G, Util, Global } = F2;
const Vector2 = G.Vector2;

export default {
  name: "x-select",
  props: {
    dataList: {
      type: Array,
      default() {
        return [0, 0, 0, 0];
      }
    }
  },
  data() {
    return {
      chart: null,
      dataSource: [
        {
          year: "故障",
          sales: 0,
          color: "l(90) 0:#5794FF 1:#6B5FFE"
        },
        {
          year: "报警",
          sales: 0,
          color: "l(90) 0:#FF5E39 1:#FF5E39"
        },
        {
          year: "警告",
          sales: 0,
          color: "l(90) 0:#FFA523 1:#F89200"
        },
        {
          year: "离线",
          sales: 0,
          color: "l(90) 0:#D4D4D6 1:#D4D4D6"
        }
      ]
    };
  },
  watch: {
    dataList() {
      for (let i = 0; i < this.dataList.length; i++) {
        this.dataSource[i].sales = this.dataList[i];
      }
      this.refreshData();
    }
  },
  created() {
    for (let i = 0; i < this.dataList.length; i++) {
      this.dataSource[i].sales = this.dataList[i];
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.chart = new F2.Chart({
        id: this.$refs.container,
        pixelRatio: window.devicePixelRatio
      });

      this.chart.source(this.dataSource, {
        sales: {
          tickCount: 4
        }
      });
      this.chart.tooltip({
        showItemMarker: false,
        onShow: function onShow(ev) {
          const items = ev.items;
          items[0].name = null;
          items[0].name = items[0].title;
          items[0].value = "¥ " + items[0].value;
        }
      });
      this.chart.interval().position("year*sales");
      this.chart.render();
      // 绘制柱状图文本
      const offset = -5;
      const canvas = this.chart.get("canvas");
      const group = canvas.addGroup();
      this.dataSource.forEach(obj => {
        const point = this.chart.getPosition(obj);
        group.addShape("text", {
          attrs: {
            x: point.x,
            y: point.y + offset,
            text: obj.sales,
            textAlign: "center",
            textBaseline: "bottom",
            fill: "#808080"
          }
        });
      });
    },
    refreshData() {
      this.chart.clear();
      this.chart.source(this.dataSource, {
        sales: {
          tickCount: 4
        }
      });
      this.chart.tooltip({
        showItemMarker: false,
        onShow: function onShow(ev) {
          const items = ev.items;
          items[0].name = null;
          items[0].name = items[0].title;
          items[0].value = "¥ " + items[0].value;
        }
      });
      this.chart.interval().position("year*sales");
      this.chart.render();
      // 绘制柱状图文本
      const offset = -5;
      const canvas = this.chart.get("canvas");
      const group = canvas.addGroup();
      this.dataSource.forEach(obj => {
        const point = this.chart.getPosition(obj);
        group.addShape("text", {
          attrs: {
            x: point.x,
            y: point.y + offset,
            text: obj.sales,
            textAlign: "center",
            textBaseline: "bottom",
            fill: "#808080"
          }
        });
      });
    }
  }
};
</script>
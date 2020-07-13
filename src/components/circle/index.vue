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
    <canvas
      ref="container"
      id="container"
      width="105"
      height="105"
      style="width: 110px; height: 110px;"
    />
    <div class="title">{{this.title}}</div>
  </div>
</template>

<script>
import F2 from "@antv/f2";

const { Shape, G, Util, Global } = F2;
const Vector2 = G.Vector2;

export default {
  name: "x-select",
  props: {
    title: {
      type: String,
      default() {
        return "";
      }
    },
    color: {
      type: String,
      default() {
        return "l(0,0) 0:#1ACC83 1:#14E08C";
      }
    },
    num: {
      type: Number,
      default() {
        return 0;
      }
    }
  },
  data() {
    return {
      chart: null,
      dataSource: [
        {
          const: "a",
          actual: 0,
          expect: 100
        }
      ]
    };
  },
  watch: {
    num() {
      this.dataSource[0].actual = this.num;
      this.$nextTick(() => {
        this.refreshData();
      });
    }
  },
  created() {
    this.dataSource[0].actual = this.num;
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      const container1 = this.$refs.container;
      container1.className = "guage";
      // 极坐标下带圆角的柱子，只对极坐标生效
      Shape.registerShape("interval", "polar-tick", {
        draw: function draw(cfg, container1) {
          const points = this.parsePoints(cfg.points);
          const style = Util.mix(
            {
              stroke: cfg.color
            },
            Global.shape.interval,
            cfg.style
          );

          let newPoints = points.slice(0);
          if (this._coord.transposed) {
            newPoints = [points[0], points[3], points[2], points[1]];
          }

          const center = cfg.center;
          const x = center.x,
            y = center.y;

          const v = [1, 0];
          const v0 = [newPoints[0].x - x, newPoints[0].y - y];
          const v1 = [newPoints[1].x - x, newPoints[1].y - y];
          const v2 = [newPoints[2].x - x, newPoints[2].y - y];

          let startAngle = Vector2.angleTo(v, v1);
          let endAngle = Vector2.angleTo(v, v2);
          const r0 = Vector2.length(v0);
          const r = Vector2.length(v1);

          if (startAngle >= 1.5 * Math.PI) {
            startAngle = startAngle - 2 * Math.PI;
          }

          if (endAngle >= 1.5 * Math.PI) {
            endAngle = endAngle - 2 * Math.PI;
          }

          const lineWidth = r - r0;
          const newRadius = r - lineWidth / 2;

          return container1.addShape("Arc", {
            className: "interval",
            attrs: Util.mix(
              {
                x,
                y,
                startAngle,
                endAngle,
                r: newRadius,
                lineWidth,
                lineCap: "round"
              },
              style
            )
          });
        }
      });
      this.chart = new F2.Chart({
        id: container1,
        padding: [10, 10, 40, 10],
        pixelRatio: window.devicePixelRatio
      });
      this.chart.source(this.dataSource, {
        actual: {
          max: 100,
          min: 0,
          nice: false
        }
      });
      this.chart.coord("polar", {
        transposed: true,
        innerRadius: 0.8,
        startAngle: -Math.PI,
        endAngle: 0
      });
      this.chart.axis(false);
      this.chart
        .interval()
        .position("const*expect")
        .shape("polar-tick")
        .size(12)
        .color("#EDEDF0")
        .animate(false); // 背景条
      this.chart
        .interval()
        .position("const*actual")
        .shape("polar-tick")
        .size(12)
        .color(this.color); // 实际进度

      this.chart.guide().html({
        position: ["50%", "80%"],
        html: `<div style="width: 120px;color: #2B7FF2;white-space: nowrap;text-align:center;">
              <p style="font-size: 18px;margin:0;">&nbsp;</p>
              <p id="text" style="font-size: 28px;margin:0;font-weight: bold;">${
                this.num
              }<span style="color:#ccc;font-size:18px;padding-left:5px;">%</span></p>
            </div>`
      });
      this.chart.guide().html({
        position: [0, this.dataSource[0].actual],
        html: `<div style="width: 10px;height: 10px;background-color:white;border-radius:50%;"></div>`
      });
      this.chart.render();
    },
    refreshData() {
      this.chart.clear();
      this.chart.source(this.dataSource, {
        actual: {
          max: 100,
          min: 0,
          nice: false
        }
      });
      this.chart.coord("polar", {
        transposed: true,
        innerRadius: 0.8,
        startAngle: -Math.PI,
        endAngle: 0
      });
      this.chart.axis(false);
      this.chart
        .interval()
        .position("const*expect")
        .shape("polar-tick")
        .size(12)
        .color("#EDEDF0")
        .animate(false); // 背景条
      this.chart
        .interval()
        .position("const*actual")
        .shape("polar-tick")
        .size(12)
        .color(this.color); // 实际进度
      this.chart.guide().html({
        position: ["50%", "80%"],
        html: `<div style="width: 120px;color: #2B7FF2;white-space: nowrap;text-align:center;">
              <p style="font-size: 18px;margin:0;">&nbsp;</p>
              <p id="text" style="font-size: 28px;margin:0;font-weight: bold;">${
                this.num.toFixed(0)
              }<span style="color:#ccc;font-size:18px;padding-left:5px;">%</span></p>
            </div>`
      });
      this.chart.guide().html({
        position: [0, this.dataSource[0].actual],
        html: `<div style="width: 10px;height: 10px;background-color:white;border-radius:50%;"></div>`
      });
      this.chart.render();
    }
  }
};
</script>
